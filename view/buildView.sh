#!/bin/bash



cd view &&
  export NPM_CONFIG_PRODUCTION=true &&
  export NODE_ENV=production &&
  npm run build;