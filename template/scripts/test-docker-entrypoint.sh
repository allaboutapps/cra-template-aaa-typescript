#!/bin/bash

NGINX_BASE=./nginx

# Create fake nginx folder structure to match production
mkdir -p $NGINX_BASE/html/app
mkdir -p $NGINX_BASE/conf.d


NGINX_CONF=$NGINX_BASE/conf.d/default.conf
CONFIG_JS=$NGINX_BASE/html/app/config.js
INDEX_HTML=$NGINX_BASE/html/app/index.html

# Copy build files
cp -r ./build/* $NGINX_BASE/html/app

# Copy nginx config
cp ./nginx-default.conf $NGINX_CONF

BASE="/docker-entry-test"
API="/api"
ENV="test-env"

REACT_APP_BASE_NAME=$BASE
REACT_APP_API_BASE_URL=$API
REACT_APP_DEPLOYMENT_ENV=$ENV

# Run script with source so REACT_XYZ are visible
# "test" param is used to skip exec "$@" at the end of the script
chmod +x ./docker-entrypoint.sh
source ./docker-entrypoint.sh "test"

# Verify nginx config was patched correctly
if ! grep -q "location $BASE {" "$NGINX_CONF" || ! grep -q "location $BASE/static {" "$NGINX_CONF"; then
  echo "nginx config base name not patched successfully"
  cat $NGINX_CONF
  exit 1
fi

# Verify config.js was patched correctly
if ! grep -q "ENV_BASE_NAME = \"$BASE\"" "$CONFIG_JS" || \
   ! grep -q "ENV_API_BASE_URL = \"$API\"" "$CONFIG_JS" || \
   ! grep -q "ENV_DEPLOYMENT_ENV = \"$ENV\"" "$CONFIG_JS" ; then
  echo "config.js not patched successfully"
  cat $CONFIG_JS
  exit 1
fi

# Verify index.html was patched correctly
if ! grep -q "<base href=\"$BASE/\">" "$INDEX_HTML"; then
  echo "index.html not patched successfully"
  cat $INDEX_HTML
fi

# Cleanup
rm -rf $NGINX_BASE

echo "docker-entrypoint.sh test passed successfully"
