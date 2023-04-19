#!/bin/bash

DOCKERFILE_VERSION=$(awk '/^FROM node/{print $2}' Dockerfile | cut -d':' -f2)
NVMRC_VERSION=$(cat .nvmrc)

if [[ "$DOCKERFILE_VERSION" == "$NVMRC_VERSION" ]]; then
  echo "Versions match: $DOCKERFILE_VERSION"
else
  echo "Error: Versions do not match!"
  echo "Dockerfile version: $DOCKERFILE_VERSION"
  echo ".nvmrc version: $NVMRC_VERSION"
  exit 1
fi
