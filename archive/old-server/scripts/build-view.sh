#!/bin/bash

# Ensure wildcards in globs match dotfiles too.
shopt -s dotglob

log_title() {
  printf "\n"
  sed -u 's/^/--------->  /'
  printf "\n"
}

echo "Building view for STAGE: $STAGE" | log_title

export BUILD_DIR="$(pwd)"

TMP_PACKAGES_DIR="${BUILD_DIR}/.view-build-tmp"
PACKAGES_DIR="$(dirname $BUILD_DIR)"


install_view () {
  echo "INSTALL VIEW" | log_title
  cd "${PACKAGES_DIR}/landing" &&
  npm run install:ci &&
  cd "${PACKAGES_DIR}/react-projects" &&
  npm run install:ci
}

build_view () {
  echo "BUILD VIEW" | log_title
  pwd
  cd "${PACKAGES_DIR}/landing" &&
  npm run build:ci &&
  cd "${PACKAGES_DIR}/react-projects" &&
  npm run build:ci &&
  mv "${PACKAGES_DIR}/react-projects/build" "${BUILD_DIR}/public/react-projects" 
}

purge_view () {
  echo "PURGE VIEW" | log_title
  rm -rf "${PACKAGES_DIR}/landing" &&
  rm -rf "${PACKAGES_DIR}/react-projects" &&
  rm -rf $TMP_PACKAGES_DIR
}

if [ "$STAGE" != "local" ]; then
  mv "${TMP_PACKAGES_DIR}"/* "${PACKAGES_DIR}"
fi

(
  install_view &&
  build_view
)

if [ "$STAGE" != "local" ]; then
  purge_view
else
  echo "Skipping purge..."
fi

if [ $? -ne 0 ]; then
  echo "FAILED to build view" | log_title
  exit 1
fi

echo "Builded view successfully" | log_title
