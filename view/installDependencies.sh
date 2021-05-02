#!/bin/bash

export NPM_CONFIG_PRODUCTION=false &&
  export NODE_ENV= &&
  cd view &&
  NPM_CONFIG_PRODUCTION=false NODE_ENV=development npm install;