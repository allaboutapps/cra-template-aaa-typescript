#############
## Builder ##
#############

# Builder image uses node/yarn (on debian jessie) to create production build of frontend
FROM node:16.18.0 as builder

# Yes no maybe. This is strange. Although all default shells are bash and bash has been set as the shell for yarn/npm to use,
# it still runs everything as /bin/sh for some weird reason. Let's make sure it doesn't. Naughty yarn.
RUN rm /bin/sh \
    && ln -s /bin/bash /bin/sh

# Setup /app/ with current code
WORKDIR /app

# https://github.com/nodejs/docker-node/issues/661
# Remove the version of yarn that is coming with node & install latest yarn
RUN rm -f /usr/local/bin/yarn && \
    curl -o- -L https://yarnpkg.com/install.sh | bash && \
    chmod +x ~/.yarn/bin/yarn && \
    ln -s ~/.yarn/bin/yarn /usr/local/bin/yarn


# Install Cypress dependencies
# https://docs.cypress.io/guides/continuous-integration/introduction#Dependencies
# RUN apt-get update && apt-get install --no-install-recommends -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

# Copy only package.json and yarn.lock first to properly leverage Docker build caching for node_modules, greatly speeds up build times
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

# Install all required modules first, `--production=false` is required since the default node image sets `NODE_ENV production`,
# which causes yarn to not install any devDependencies. Node module install script will now be cached unless the package files are modified
RUN yarn install --pure-lockfile --production=false

# Copy project sources
COPY . /app/

ARG REACT_APP_COMMIT_HASH=unspecified

# Build project and copy to nginx folder, then clean up sources
# Re-export build args to strip double quotes from them (taken from https://stackoverflow.com/a/9733456 @ 2018-08-20)
# set -e stops the execution of the script if a command has an error.
RUN set -e \
    && cd /app \
    && export PUBLIC_URL=. \
    && export REACT_APP_COMMIT_HASH=$(sed -e 's/^"//' -e 's/"$//' <<<"$REACT_APP_COMMIT_HASH") \
    && export REACT_APP_BUILD_DATE=$(TZ=":Europe/Vienna" date) \
    && export NODE_ENV=production \
    && yarn build

############
## Runner ##
############

# Runner image uses minimal nginx setup (on alpine linux) required for serving frontend
FROM nginx:alpine as runner
EXPOSE 80

ENV REACT_APP_API_BASE_URL=/api
ENV REACT_APP_BASE_NAME=/
ENV REACT_APP_DEPLOYMENT_ENV=unspecified

# Copy entrypoint script for replacing API base URL dynamically via environment variable
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Copy default nginx config in repo
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

# Copy only minified build files from builder setup
COPY --from=builder /app/build /etc/nginx/html/app

# Entrypoint ensures correct API base URL is set via environment variables on runtime
ENTRYPOINT [ "/app/docker-entrypoint.sh" ]

CMD ["nginx", "-g", "daemon off;"]
