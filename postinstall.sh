#!/bin/bash


set -o errexit    # always exit on error
set -o pipefail   # don't ignore exit codes when piping output

lerna bootstrap --scope server --ignore-prepublish
lerna bootstrap --ignore-prepublish --ignore=server -- --production=false
