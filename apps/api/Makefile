# Load deployment environment variables
-include .env.deploy.local
-include .env.deploy

.PHONY: deploy

deploy:
	@echo "Deploying with configuration:"
	@echo "  REMOTE_USER: $(REMOTE_USER)"
	@echo "  REMOTE_HOST: $(REMOTE_HOST)"
	@echo "  REMOTE_PATH: $(REMOTE_PATH)"
	@echo "  IMAGE_NAME: $(IMAGE_NAME)"
	@echo "  IMAGE_TAG: $(IMAGE_TAG)"
	@echo "  ARCHIVE_NAME: $(ARCHIVE_NAME)"
	@echo ""
ifeq ($(REMOTE_HOST),)
	$(error REMOTE_HOST is not set. Please create .env.deploy.local from .env.deploy and set your remote host)
endif
	@bash scripts/deploy.sh
