#!/bin/bash

cd view &&
  export NPM_CONFIG_PRODUCTION=false &&
  export NODE_ENV= &&
  echo NPM_CONFIG_PRODUCTION &&
  echo ${NPM_CONFIG_PRODUCTION} &&
  NPM_CONFIG_PRODUCTION=false NODE_ENV=development npm install --only=dev &&

echo "*** LISTING VIEW AFTER INSTALL***"
ls -la .
echo "********************************"
echo "*** LISTING VIEW node_modules AFTER INSTALL ***"
echo "********************************"
ls -la ./node_modules