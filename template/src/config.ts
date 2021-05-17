import * as _ from "lodash";

// Application specific configuration variables
// potentially sourced from process.env.REACT_APP_*

// Variables defined in `public/config.js`, created from environment variables via `docker-entrypoint.sh` script on Docker container start
// Will override "env" variables defined at runtime if set
declare const ENV_API_BASE_URL: string;
declare const ENV_BASE_NAME: string;

export const API_BASE_URL = (
    _.isEmpty(ENV_API_BASE_URL) ? process.env.REACT_APP_API_BASE_URL : ENV_API_BASE_URL
) as string;
export const BASE_NAME = (_.isEmpty(ENV_BASE_NAME) ? process.env.REACT_APP_BASE_NAME : ENV_BASE_NAME) as string;
