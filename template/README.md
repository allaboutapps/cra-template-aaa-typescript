# README

## How to generate types from a Swagger specification

We provide a script that lets you generate TypeScript types for a Swagger specification.

### Local

Run `yarn local <file_name>` to generate types from a swagger file in your local repository. Note that the file needs to be located at the root folder.

### Remote

To use a remote source run `yarn dev`. Don't forget to set a correct `BASE_URL` in `swagger-codegen.sh` which can be found in `./scripts`.

## Setting env variables at runtime

Sometimes there is a need to set env variables at runtime in the environment where the constainer is being executed. We provide support for the following env variables which can be set at runtime per default:

| Name          | Default       | Description   |
| ------------- | ------------- | ------------- |
| REACT_APP_API_BASE_URL | /api | The base URL where the API can be found. |
| REACT_APP_BASE_NAME | / | The base URL for all locations. If your app is served from a sub-directory on your server, you’ll want to set this to the sub-directory. A properly formatted basename should have a leading slash, but no trailing slash. Take from https://v5.reactrouter.com/web/api/BrowserRouter/basename-string. |

If you want to add other env variables that can be changed during runtime you need to add them in `Dockerfile`, `config.js`, `config.ts` and in `docker-entrypoint.sh`.


## Project origin

This project was bootstrapped from a customized React template for [Create React App](https://github.com/facebook/create-react-app).

For the template project see [cra-template-aaa-typescript](https://github.com/allaboutapps/cra-template-aaa-typescript).
