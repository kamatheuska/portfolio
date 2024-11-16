#!/bin/bash

docker run \
    --init \
    -e NODE_ENV=production \
    --env-file ./.env \
    -m "300M" --memory-swap "1G" \
    --name "portfolio-server" \
    -p 3000:3000 \
    portfolio-server
