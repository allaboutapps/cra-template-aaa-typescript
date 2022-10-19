# `cra-template-aaa-typescript` [![npm version](https://badge.fury.io/js/cra-template-aaa-typescript.svg)](https://badge.fury.io/js/cra-template-aaa-typescript) [![Build and Test](https://github.com/allaboutapps/cra-template-aaa-typescript/actions/workflows/build-test.yaml/badge.svg)](https://github.com/allaboutapps/cra-template-aaa-typescript/actions)


This is the aaa TypeScript template for [Create React App](https://github.com/facebook/create-react-app).

To use this template, add `--template aaa-typescript` when creating a new app.

For example:

```sh
npx create-react-app my-app --template aaa-typescript

# or

yarn create react-app my-app --template aaa-typescript
```

For more information, please refer to:

- [Getting Started](https://create-react-app.dev/docs/getting-started) – How to create a new app.
- [User Guide](https://create-react-app.dev) – How to develop apps bootstrapped with Create React App.

## Differences to the official TypeScript template

- We strive to support Visual Studio Code as much as possible.
- Easy overwrite of configurations through a local `craco.config.js` file in the project. Also see [Craco](https://github.com/gsoft-inc/craco).
- Automatically installs compatible versions of popular libraries within our organization.
- Support for compile-time safe i18n through customized typings and utils in the projects.
- Sample Login-Page in the frontend code.
- `eslintrc` is overwritable.

## Development

To test the template run `yarn test`. This will create a new project in `template-test`.

### How to publish a new version

**DO NOT** increase the build version in `package.json` and don't add a git tag. `npx np` will do that for you in the next step.

To publish new versions use np (https://www.npmjs.com/package/np).

```sh
npx np
```

### Testing template Dockerfile

Run `yarn test` and then switch to the newly created folder `template-test`.

Run the following commands to build the image and run it:

```sh
docker build . \
--build-arg REACT_APP_API_BASE_URL=http://localhost \
--build-arg REACT_APP_DEPLOYMENT_ENV=dev:optimized \
--build-arg REACT_APP_BASE_NAME=/webapp \
--build-arg REACT_APP_COMMIT_HASH=main_d00faffe \
--build-arg PUBLIC_URL=. \
-t cra-template-aaa-typescript

docker run -p 80:80 cra-template-aaa-typescript
# http://localhost

docker run -p 80:80 -e REACT_APP_BASE_NAME="/webapp" cra-template-aaa-typescript
# http://localhost/webapp

docker run -p 80:80 -e REACT_APP_BASE_NAME="/cms" cra-template-aaa-typescript
# http://localhost/cms
```

### How to generate types from a Swagger Specification

Run `yarn local <file_name>` to generate types from a swagger file in your local repository. Note that the file needs to be located at the root folder.

To use a remote source run `yarn dev`. Don´t forget to set a correct BASE_URL in `swagger-codegen.sh` which can be found in `./scripts`.
