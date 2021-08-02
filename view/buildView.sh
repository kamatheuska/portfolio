#!/bin/bash



cd view &&
  ls -la . &&
  echo "*********************************************" &&
  echo "*** LISTING VIEW node_modules before BUILD***" &&
  echo "*********************************************" &&
  export NPM_CONFIG_PRODUCTION=true &&
  export NODE_ENV=production &&
  npm run build;