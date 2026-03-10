#!/bin/bash
set -e

echo "=== Loading Docker image ==="
sudo docker load < image.tar
echo "Image loaded"

echo "=== Starting services ==="
sudo docker compose up -d
echo "Services started"

echo "=== Cleaning up ==="
rm -f image.tar

echo "=== Deployment complete ==="
sudo docker compose ps
