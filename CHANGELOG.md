# Changelog

## Upcoming

- Add builder step to drone file with lint step
- Update tsconfig.json
- Fix dynamic env var replacement
- Fix env vars no longer available in nginx image due to new builder step
- Fix handling of base names which are /
- Use `craco` instead of `react-scripts` so that the `craco.config.js` file is used and the license checker works
- Remove service worker file
- Remove "REACT_APP_DEPLOYMENT_ENV" variable
- Remove @types/yup
- Add loading indicator delay
- Add useQuery
- Add useHash
- Add useInterval
- Add TextStyles.css
- Renamed Styles.ts to Colors.ts
- Removed styled-components


## 2.1.0

- Replaced outdated `jpoissonnier.vscode-styled-components` VSC extension with new `styled-components.vscode-styled-components`
- Remove `hoist-non-react-statics`
- Add `showStringKeys` function

## 2.0.1

- Fixed `<base>` tag in index.html
- Fixed CustomSwitch

## 1.3.3

-   Fixed dynamic base name
    -   added meta tag to index.html
    -   added PUBLIC_URL path to config.js index.html
    -   added PUBLIC_URL "." to .drone.yml

## 1.3.1 & 1.3.2

-   Updated `README.md` publishing info.

## 1.3.0

-   For drone builds: add git branch, hash and build time as comment to <head> section

## 1.2.0

## Added

-   Added `<ErrorMessage>` component
-   Dynamic base name

### Updated

-   Updated all packages to latest version
-   Updated `README.md` with instructions on how to test template locally
-   Updated to node 14

### Removed

-   Removed last `tslint` leftovers
-   Removed `launch.json` and `tasks.json`
-   Removed VSC extension `msjsdiag.debugger-for-chrome`
-   Removed default meta description to avoid being shown in search results

### Notable changes

-   [TypeScript 4](https://devblogs.microsoft.com/typescript/announcing-typescript-4-0/)
-   [Fast Refresh](https://github.com/facebook/create-react-app/blob/master/CHANGELOG.md#400-2020-10-23)
