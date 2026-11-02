# Usage: make deploy <app>   e.g. make deploy admin, make deploy api
#        make logs           open an SSH tunnel to Dozzle on the VPS
# Delegates to the `deploy` target in apps/<app>/Makefile

APPS := admin api

# Remote server settings, shared with the admin deploy (.env.deploy.local overrides .env.deploy)
-include apps/admin/.env.deploy
-include apps/admin/.env.deploy.local

# Local port the Dozzle tunnel listens on
DOZZLE_PORT ?= 8080

.PHONY: deploy logs $(APPS)

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

# App names are only arguments to `deploy`; do nothing on their own
$(APPS):
	@:
