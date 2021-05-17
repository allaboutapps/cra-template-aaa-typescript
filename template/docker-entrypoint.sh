#!/bin/sh

set -e

# Only update config with defined env variables if we"re running an nginx process so we can still attach with debugging commands
# without accidentally modifying anything
if [ "$1" == "nginx" ]; then
    if [ ! -z "${REACT_APP_API_BASE_URL}" ]; then
        sed -i "/ENV_API_BASE_URL/c\var ENV_API_BASE_URL = \"${REACT_APP_API_BASE_URL}\";" /etc/nginx/html/config.js
    fi

    if [ ! -z "${REACT_APP_BASE_NAME}" ]; then
        sed -i "/ENV_BASE_NAME/c\var ENV_BASE_NAME = \"${REACT_APP_BASE_NAME}\";" /etc/nginx/html/config.js
        sed -i "s#REACT_APP_BASE_NAME#$REACT_APP_BASE_NAME#g" /etc/nginx/conf.d/default.conf | sed "s#//#/#g"
        sed -i "s#<base href=\"/\">#<base href=\"$REACT_APP_BASE_NAME/\">#g" /etc/nginx/html/index.html | sed "s#<base href=\"//\">#<base href=\"/\">#g"
    fi
fi

exec "$@"
