#!/bin/bash

set -euo pipefail

# Check for required files
echo "=== Checking required files ==="
required_files=("docker-compose.prod.yml" ".env.prod" "Dockerfile" "../api/scripts/start.sh")
for file in "${required_files[@]}"; do
    if [[ ! -f "$file" ]]; then
        echo "Missing required file: $file"
        exit 1
    fi
    echo "Found: $file"
done

echo "=== Building Docker images from docker-compose.prod.yml ==="
docker compose -f docker-compose.prod.yml build

echo "=== Saving Docker images to archive ==="
docker save "${IMAGE_NAME}:${IMAGE_TAG}" "${IMAGE_NAME}-migrations:${IMAGE_TAG}" > "image.tar"

echo "=== Creating deployment package ==="

# Create temporary directory for packaging
TEMP_DIR=$(mktemp -d)
DEPLOY_DIR="${TEMP_DIR}/portfolio-admin"
mkdir -p "${DEPLOY_DIR}"

# Copy files to deployment directory
cp "image.tar" "${DEPLOY_DIR}/"
cp "docker-compose.prod.yml" "${DEPLOY_DIR}/docker-compose.yml"
cp ".env.prod" "${DEPLOY_DIR}/"
cp "../api/scripts/start.sh" "${DEPLOY_DIR}/"

if [[ -f "nginx.conf" ]]; then
    cp "nginx.conf" "${DEPLOY_DIR}/"
    echo "Included nginx.conf"
fi

if [[ -d "ssl" && "$(ls -A ssl 2>/dev/null)" ]]; then
    mkdir -p "${DEPLOY_DIR}/ssl"
    cp -r ssl/* "${DEPLOY_DIR}/ssl/"
    echo "Included SSL certificates"
fi

tar -czf "${ARCHIVE_NAME}" -C "${TEMP_DIR}" "portfolio-admin"
rm -rf "${TEMP_DIR}" "image.tar"

echo "Deployment package created: ${ARCHIVE_NAME}"
echo "  Size: $(du -h "${ARCHIVE_NAME}" | cut -f1)"

echo "=== Copying to remote server via SCP ==="
scp -P "${SSH_PORT}" "${ARCHIVE_NAME}" "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/"

echo "Archive copied to ${REMOTE_HOST}:${REMOTE_PATH}/"

echo "=== Cleaning up local archive ${ARCHIVE_NAME} ==="
rm -f "${ARCHIVE_NAME}"

echo "=== Deployment package sent successfully! ==="
echo ""
echo "To deploy on the remote server:"
echo "  ssh ${REMOTE_USER}@${REMOTE_HOST}"
echo "  cd ${REMOTE_PATH}"
echo "  rm -rf portfolio-admin"
echo "  tar -xzf ${ARCHIVE_NAME}"
echo "  rm -f ${ARCHIVE_NAME}"
echo "  cd portfolio-admin"
echo "  ./start.sh"
