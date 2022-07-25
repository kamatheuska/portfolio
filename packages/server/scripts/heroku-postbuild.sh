#!/bin/bash

# Ensure wildcards in globs match dotfiles too.
shopt -s dotglob

log_title() {
  sed -u 's/^/--------->  /'
}

BUILD_DIR="$(pwd)"

install_view () {
  echo "INSTALL VIEW" | log_title
  cd $BUILD_DIR/packages/landing &&
  npm run install:ci &&
  cd $BUILD_DIR/packages/react-projects &&
  npm run install:ci
}

build_view () {
  echo "BUILD VIEW" | log_title
  cd $BUILD_DIR/packages/landing &&
  npm run build:ci &&
  cd $BUILD_DIR/packages/react-projects &&
  npm run build:ci
}

purge_view () {
  echo "PURGE VIEW" | log_title
  rm -rf $BUILD_DIR/packages
}

(
  install_view &&
  build_view &&
  purge_view
)

if [ $? -ne 0 ]; then
  echo "FAILED to build view" | log_title
  exit 1
fi

echo "Builded view successfully" | log_title
