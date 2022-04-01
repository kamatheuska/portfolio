#!/bin/bash

source ./scripts/utils.sh

MAIN=""

function set_heroku_root_folder () {
  MAIN=$(pwd)

  printf "MAIN=$MAIN"
}

function configure_node () {
  NPM_CONFIG_PRODUCTION=$1
  NODE_ENV=$2

  printf "NPM_CONFIG_PRODUCTION=$NPM_CONFIG_PRODUCTION"
  printf "NODE_ENV=$NODE_ENV"
}

function install_landing () {
  cd $MAIN/packages/landing;
  npm install --production=false;
}

function install_react_projects () {
  cd $MAIN/packages/react-projects;
  npm install --production=false;
}

log_title "INSTALL VIEW"

log_subtitle "1. Clean"
./node_modules/.bin/lerna clean -y --ignore=server

log_subtitle "2. Setting heroku root folder for scripts"
set_heroku_root_folder


# log_subtitle "2. Configuring node and npm"
# configure_node false "development"


log_subtitle "3. Installing packages"
./node_modules/.bin/lerna bootstrap \
  --ci --ignore=server \
  -- --production=false \
  