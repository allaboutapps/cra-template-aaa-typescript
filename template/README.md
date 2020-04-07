# aaa-react-scripts-ts

This project was bootstrapped through `yarn create react-app my-app --scripts-version=aaa-react-scripts-ts`, a customized react template project generator for [at all about apps](https://allaboutapps.at).

## Additional dependencies

- [`material-ui`](https://npmjs.org/package/material-ui)
- [`react-intl`](https://npmjs.org/package/react-intl)
  - A custom `@types/react-intl` is supplied in generated projects that introduces the generic IDS to check used i18n keys during compile time
- [`intl`](https://npmjs.org/package/intl) (Polyfill for safari, only loaded if required)
- [`lodash`](https://npmjs.org/package/lodash)
- [`hoist-non-react-statics`](https://npmjs.org/package/hoist-non-react-statics) (If you write your own Higher Order Components)
- [`formik`](https://github.com/jaredpalmer/formik)
- [`yup`](https://github.com/jquense/yup) (as validator for formik)
- [`mobx`](https://npmjs.org/package/mobx) + [`mobx-react`](https://npmjs.org/package/mobx-react) + [`mobx-persist`](https://npmjs.org/package/mobx-persist) + [`localforage`](https://npmjs.org/package/localforage)
- [`react-router`](https://npmjs.org/package/react-router)

## Original READMEs

[Create React App](https://github.com/facebookincubator/create-react-app).

The most recent version of the Create React App guides can be found [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
