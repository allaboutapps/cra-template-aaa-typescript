#!/bin/sh

# This file is run inside the nginx container, which serves the frontend, as ENTRYPOINT.
# It is responsible for replacing dynamic configuration at runtime in various files.

set -e

# Only update config with defined env variables if we are running an nginx process so we can still attach with debugging commands
# without accidentally modifying anything
if [ "$1" == "nginx" ]; then
    if [ ! -z "${REACT_APP_API_BASE_URL}" ]; then
        sed -i "/ENV_API_BASE_URL/c\var ENV_API_BASE_URL = \"${REACT_APP_API_BASE_URL}\";" /etc/nginx/html/app/config.js
    fi

    if [ ! -z "${REACT_APP_DEPLOYMENT_ENV}" ]; then
        sed -i "/ENV_DEPLOYMENT_ENV/c\var ENV_DEPLOYMENT_ENV = \"${REACT_APP_DEPLOYMENT_ENV}\";" /etc/nginx/html/app/config.js
    fi

    if [ ! -z "${REACT_APP_BASE_NAME}" ]; then
        sed -i "/ENV_BASE_NAME/c\var ENV_BASE_NAME = \"${REACT_APP_BASE_NAME}\";" /etc/nginx/html/app/config.js
        sed -i "s#REACT_APP_BASE_NAME#$REACT_APP_BASE_NAME#g" /etc/nginx/conf.d/default.conf | sed "s#//#/#g"

        # The <base href="/"> is already set to "/". If the REACT_APP_BASE_NAME is a "/", it will change the base href to "//" which is invalid.
        # Therefore we only run the command if the REACT_APP_BASE_NAME is not "/".
        if [ "$REACT_APP_BASE_NAME" != "/" ]; then
            sed -i "s#<base href=\"/\">#<base href=\"$REACT_APP_BASE_NAME/\">#g" /etc/nginx/html/app/index.html | sed "s#<base href=\"//\">#<base href=\"/\">#g"
        fi
    fi
fi

exec "$@"
