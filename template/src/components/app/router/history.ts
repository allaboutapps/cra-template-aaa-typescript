import queryString from "query-string";
import { useNavigate } from "react-router-dom";

type RouteOptions = {
    params?: { [key: string]: string };
    query?: { [key: string]: any };
    state?: any;
};

export const withQuery = (route: string, params: { [key: string]: any }) => {
    const query = queryString.stringify(params);

    return `${route}?${query}`;
};

export const withParams = (route: string, params: { [key: string]: string }) => {
    const routeParams = route.split("/").filter((component) => component.startsWith(":"));
    const paramKeys = Object.keys(params);
    // Look for params that are not defined in the route params
    const notFound = paramKeys.filter((key) => routeParams.indexOf(`:${key}`) < 0);
    if (notFound.length > 0) {
        throw new Error(`Invalid URL parameters "${notFound}" for route "${route}". Maybe a typo?`);
    }

    return paramKeys.reduce((url, key) => url.replace(`:${key}`, params[key]), route);
};

export const usePushRoute = () => {
    const navigate = useNavigate();

    const pushRoute = (route: string, options?: RouteOptions) => {
        let url = route;

        if (options?.params) {
            url = withParams(url, options.params);
        }

        if (options?.query) {
            url = withQuery(url, options.query);
        }

        navigate(url, options?.state);
    };

    return pushRoute;
};
