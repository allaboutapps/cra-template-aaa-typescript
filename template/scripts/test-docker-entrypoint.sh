#!/bin/bash

# Create fake nginx folder structure to match production
mkdir -p /etc/nginx/html/app
mkdir -p /etc/nginx/conf.d

NGINX_CONF=/etc/nginx/conf.d/default.conf
CONFIG_JS=/etc/nginx/html/app/config.js
INDEX_HTML=/etc/nginx/html/app/index.html

# Copy build files
cp -r ./build/* /etc/nginx/html/app

# Copy nginx config
cp ./nginx-default.conf $NGINX_CONF

# Create test entrypoint script
cp docker-entrypoint.sh docker-entrypoint-test.sh
chmod +x docker-entrypoint-test.sh

BASE="/docker-entry-test"
API="/api"
ENV="test-env"

REACT_APP_BASE_NAME=$BASE
REACT_APP_API_BASE_URL=$API
REACT_APP_DEPLOYMENT_ENV=$ENV

# Run script with source so REACT_XYZ ate visible
# "test" param is used to skip exec "$@" at the end of the script
source docker-entrypoint-test.sh "test"

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
rm -rf /etc/nginx
rm docker-entrypoint-test.sh

echo "docker-entrypoint.sh test passed successfully"
