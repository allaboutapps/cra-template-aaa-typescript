# `cra-template-aaa-typescript` [![npm version](https://badge.fury.io/js/cra-template-aaa-typescript.svg)](https://badge.fury.io/js/cra-template-aaa-typescript)

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

- We strive to support Visual Studio Code as much as possible
- Easy overwrite of configurations through a local `craco.config.js` file in the project. Also see [Craco](https://github.com/gsoft-inc/craco)
- Automatically installs compatible versions of popular libraries within our organization
- Support for compile-time safe i18n through customized typings and utils in the projects
- Sample Login-Page in the frontend code
- `eslintrc` is overwritable and still coming with full tslint support.

## How tu publish a new version

To publish new versions use np (https://www.npmjs.com/package/np).

```sh
npx np
```
