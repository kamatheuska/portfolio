# Usage: make deploy <app>   e.g. make deploy admin, make deploy api
#        make logs           open an SSH tunnel to Dozzle on the VPS
#        make dozzle-user    create the Dozzle login (apps/admin/dozzle-users.yml)
# Delegates to the `deploy` target in apps/<app>/Makefile

SHELL := /bin/bash

APPS := admin api

# Remote server settings, shared with the admin deploy (.env.deploy.local overrides .env.deploy)
-include apps/admin/.env.deploy
-include apps/admin/.env.deploy.local

# Local port the Dozzle tunnel listens on
DOZZLE_PORT ?= 8080

# Must match the dozzle image in apps/admin/docker-compose.prod.yml
DOZZLE_IMAGE := amir20/dozzle:v11.4.0

.PHONY: deploy logs dozzle-user $(APPS)

# Apps named on the command line after `deploy`
DEPLOY_APPS := $(filter $(APPS),$(MAKECMDGOALS))

deploy:
ifeq ($(DEPLOY_APPS),)
	$(error Specify an app to deploy: make deploy <$(subst $() ,|,$(APPS))>)
endif
	@for app in $(DEPLOY_APPS); do \
		echo "=== Deploying $$app ==="; \
		$(MAKE) -C apps/$$app deploy || exit 1; \
	done

# Tunnel to Dozzle (bound to 127.0.0.1:8080 on the VPS); Ctrl+C to close
logs:
ifeq ($(REMOTE_HOST),)
	$(error REMOTE_HOST is not set. Check apps/admin/.env.deploy)
endif
	@echo "Dozzle available at http://localhost:$(DOZZLE_PORT) (Ctrl+C to close)"
	@ssh -N -L $(DOZZLE_PORT):127.0.0.1:8080 -p $(SSH_PORT) $(REMOTE_USER)@$(REMOTE_HOST)

# Create the Dozzle login file shipped with the admin deploy (bcrypt hash only).
# Run `make deploy admin` afterwards to apply it on the VPS.
DOZZLE_USERS_FILE := apps/admin/dozzle-users.yml

dozzle-user:
	@read -p "Username: " user; \
	read -s -p "Password: " pass; echo; \
	read -s -p "Repeat password: " pass2; echo; \
	if [ -z "$$user" ] || [ -z "$$pass" ]; then echo "Username and password are required"; exit 1; fi; \
	if [ "$$pass" != "$$pass2" ]; then echo "Passwords do not match"; exit 1; fi; \
	docker run --rm $(DOZZLE_IMAGE) generate "$$user" --password "$$pass" --name "$$user" > $(DOZZLE_USERS_FILE).tmp \
		&& mv $(DOZZLE_USERS_FILE).tmp $(DOZZLE_USERS_FILE) \
		&& echo "Wrote $(DOZZLE_USERS_FILE). Run 'make deploy admin' to apply it." \
		|| { rm -f $(DOZZLE_USERS_FILE).tmp; exit 1; }

# App names are only arguments to `deploy`; do nothing on their own
$(APPS):
	@:
