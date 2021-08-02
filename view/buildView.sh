#!/bin/bash



cd view &&
  echo "********************************" &&
  echo "*** LISTING VIEW before BUILD***" &&
  echo "********************************" &&
  ls -la . &&
  echo "********************************" &&
  echo "*** LISTING VIEW node_modules ***" &&
  echo "********************************" &&
  export NPM_CONFIG_PRODUCTION=true &&
  export NODE_ENV=production &&
  npm run build;