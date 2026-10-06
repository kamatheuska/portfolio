# SSL certificates (production)

nginx serves HTTPS using `cert.pem` and `key.pem` from `/etc/nginx/ssl` inside its container. In production these come from a Let's Encrypt wildcard certificate that [Certbot](https://certbot.eff.org/instructions?ws=nginx&os=snap&tab=wildcard) issues and renews on the VPS, using the Cloudflare DNS-01 challenge.

Replace `example.com` below with your domain.

## 1. Install Certbot and the Cloudflare plugin

```bash
sudo snap install --classic certbot
sudo snap set certbot trust-plugin-with-root=ok
sudo snap install certbot-dns-cloudflare
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

`trust-plugin-with-root=ok` acknowledges that the plugin runs with the same `classic` (unconfined, root) containment as the Certbot snap.

Alternatively, on Ubuntu 22.04+ / Debian 12+: `sudo apt install certbot python3-certbot-dns-cloudflare`.

## 2. Create a Cloudflare API token

In the Cloudflare dashboard, go to **My Profile → API Tokens → Create Token** and use the **Edit zone DNS** template, scoped to your zone.

Store it on the VPS:

```bash
sudo mkdir -p /root/.secrets
echo "dns_cloudflare_api_token = <YOUR_TOKEN>" | sudo tee /root/.secrets/cloudflare.ini > /dev/null
sudo chmod 600 /root/.secrets/cloudflare.ini
```

## 3. Create the deploy hook

Certbot runs this hook after every issuance and renewal. It copies the certificate to a stable directory outside the deploy folder (which is replaced on every deploy) and reloads nginx.

```bash
sudo mkdir -p /opt/portfolio/ssl
sudo nano /usr/local/bin/portfolio-cert-deploy.sh
sudo chmod +x /usr/local/bin/portfolio-cert-deploy.sh
```

```bash
#!/bin/bash
set -euo pipefail

SSL_DIR=/opt/portfolio/ssl
COMPOSE_FILE=<REMOTE_PATH>/portfolio-api/docker-compose.yml

# certbot sets RENEWED_LINEAGE to /etc/letsencrypt/live/<domain>
install -m 644 "$RENEWED_LINEAGE/fullchain.pem" "$SSL_DIR/cert.pem"
install -m 600 "$RENEWED_LINEAGE/privkey.pem" "$SSL_DIR/key.pem"

# Reload nginx if it's running; ignore failure on first issue before deploy
docker compose -f "$COMPOSE_FILE" exec -T nginx nginx -s reload || true
```

`<REMOTE_PATH>` is the value from `.env.deploy`.

The certificate is copied rather than mounted from `/etc/letsencrypt/live/` because the files there are symlinks into `/etc/letsencrypt/archive/`, which wouldn't resolve inside the container.

## 4. Issue the certificate

```bash
sudo certbot certonly \
  --dns-cloudflare \
  --dns-cloudflare-credentials /root/.secrets/cloudflare.ini \
  --dns-cloudflare-propagation-seconds 30 \
  -d example.com -d '*.example.com' \
  --deploy-hook /usr/local/bin/portfolio-cert-deploy.sh
```

On the first run Certbot asks for an email and for you to accept the terms. A wildcard doesn't match the bare domain, so both `-d` values are needed. The hook path is saved, so renewals run it too.

Check that `/opt/portfolio/ssl` now contains `cert.pem` and `key.pem`.

## 5. Verify renewal

```bash
sudo certbot renew --dry-run
systemctl list-timers | grep certbot
```

Certificates are valid for 90 days; the snap's `snap.certbot.renew.timer` renews them automatically.

## 6. Mount the certificate in nginx

In `docker-compose.prod.yml`, the nginx service must mount the stable directory:

```yaml
volumes:
    - /opt/portfolio/ssl:/etc/nginx/ssl:ro
```
