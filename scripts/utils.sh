#!/bin/bash

function bold () {
  tput bold
  echo -n "$@"
  # bold can't be turned off by itself so this
  # turns off all attributes
  tput sgr0
}

function log_separator () {
  local separator_length=$1
  printf '=%.0s' $(seq 1 $separator_length)
  printf "\n"
}

function log_separator_under () {
  local separator_length=$1
  printf "\n"
  printf '_%.0s' $(seq 1 $separator_length)
}

function log_title () {
  local log=$1
  local log_decorated="===        $log         ==="

  printf "\n\n"
  log_separator ${#log_decorated}
  printf "$(bold $log_decorated)\n"
  log_separator ${#log_decorated}
  printf "\n\n"
}


function log_subtitle () {
  local log=$1
  local log_decorated="$log"
  printf "\n\n${log_decorated}\n"
  log_separator ${#log_decorated}
  printf "\n\n"
}

