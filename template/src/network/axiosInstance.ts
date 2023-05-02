import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { API_BASE_URL } from "../config";
import { authStore, ICredentials } from "../stores/authStore";
import { generalStore } from "../stores/generalStore";

////////////////////////////////////////////////////////////////////////////
// This file contains out basic axios client setup
// - Injects Bearer token
// - Injects Accept-Language
// - Injects base URL
// - Refreshes access token upon 401
////////////////////////////////////////////////////////////////////////////

export const axiosInstance = axios.create();

// Extend axios request config with custom properties: https://github.com/axios/axios/pull/1964#issuecomment-903983962
interface CustomAxiosRequestConfig {
    noAuthHeaders?: boolean;
    skipAuthRefresh?: boolean;
}
declare module "axios" {
    export interface AxiosRequestConfig extends CustomAxiosRequestConfig {}
}

// Inject headers
axiosInstance.interceptors.request.use((request) => {
    if (request.headers) {
        // Inject Bearer token
        if (!request.noAuthHeaders) {
            const accessToken = authStore.getState().credentials?.access_token;
            request.headers.set("Authorization", `Bearer ${accessToken}`);
        }

        // Inject Accept-Language
        request.headers.set("Accept-Language", generalStore.getState().locale);
    }

    return request;
});

// Inject base URL
axiosInstance.interceptors.request.use(async (config) => {
    config.baseURL = `${API_BASE_URL}`;
    return config;
});

// Function that will be called to refresh authorization.
// If you don't want to refresh logic upon 401 add the following to your axios request: { skipAuthRefresh: true }.
const refreshAuthLogic = async (failedRequest: any) => {
    console.log("%cRefreshing access token...", "background: #eee; color: #666;");

    const refreshToken = authStore.getState().credentials?.refresh_token;
    const setCredentials = authStore.getState().setCredentials;

    if (refreshToken) {
        try {
            const tokenRefreshResponse = await axiosInstance.post<ICredentials>(`/api/v1/auth/refresh`, {
                refresh_token: refreshToken,
            });

            if (tokenRefreshResponse) {
                setCredentials(tokenRefreshResponse.data);

                failedRequest.response.config.headers[
                    "Authorization"
                ] = `Bearer ${tokenRefreshResponse.data.access_token}`;

                console.log("%cRefreshing access token done.", "background: #eee; color: #666;");
            } else {
                console.error("Failed to refresh access token:", tokenRefreshResponse);
            }
        } catch (error) {
            console.error("Failed to refresh access token:", error);
        }
    } else {
        console.error("Can't refresh access token because there is no refresh token.");
    }
};

// Instantiate the interceptor
createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);
