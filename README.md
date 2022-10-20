# `cra-template-aaa-typescript` [![npm version](https://badge.fury.io/js/cra-template-aaa-typescript.svg)](https://badge.fury.io/js/cra-template-aaa-typescript) [![Build and Test](https://github.com/allaboutapps/cra-template-aaa-typescript/actions/workflows/build-test.yaml/badge.svg)](https://github.com/allaboutapps/cra-template-aaa-typescript/actions)


This is the [all about apps](https://allaboutapps.at/) TypeScript template for [Create React App](https://github.com/facebook/create-react-app).

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
docker build . --build-arg REACT_APP_COMMIT_HASH=happy-commit-hash -t cra-template-aaa-typescript-test

docker run -p 80:80 cra-template-aaa-typescript-test
# http://localhost

docker run -p 80:80 -e REACT_APP_API_BASE_URL="/whatever-api-url" -e REACT_APP_BASE_NAME="/drop-the-base" -e REACT_APP_DEPLOYMENT_ENV="happy-env" cra-template-aaa-typescript-test
# http://localhost/this-is-my-base
```

or use the commands

- `yarn test:with-build`
- `yarn test:with-build-and-run`
- `yarn test:with-build-and-run-with-overwrites`
