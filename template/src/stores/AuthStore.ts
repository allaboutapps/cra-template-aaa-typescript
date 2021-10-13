import localforage from "localforage";
import { makeAutoObservable, runInAction } from "mobx";
import { isHydrated, makePersistable } from "mobx-persist-store";
import * as config from "../config";
import { APIError } from "../errors/APIError";
import { API, STATUS_CODE_UNAUTHORIZED } from "../network/API";

export interface ICredentials {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
}

export interface IProfile {
    uid: string;
    scope: string[];
    email: string;
}

export type AuthError = "PasswordWrong" | "Unknown";

class Auth {
    credentials: ICredentials | null = null;
    userProfile: IProfile | null = null;
    username = "";
    error: AuthError | null = null;
    isAuthenticated = false;
    isLoading = false;
    globalLegalUpdatedAt: string | null = null;

    constructor() {
        makeAutoObservable(this);

        makePersistable(this, {
            name: "auth",
            properties: ["credentials", "userProfile", "username"],
            storage: localforage,
        }).then(() => {
            if (this.credentials !== null) {
                this.tokenExchange()
                    .then(() => {
                        console.log("hydrate.auth: received new token!");
                    })
                    .catch(() => {
                        console.log("hydrate.auth: failed to receive new token!");
                    });
            } else {
                console.log("rehydrated, no credentials are available.");
            }
        });
    }

    get isRehydrated() {
        return isHydrated(this);
    }

    loginWithPassword = async (username: string, password: string) => {
        if (this.isLoading) {
            // bailout, noop
            return;
        }

        this.isLoading = true;

        try {
            const credentials = await API.loginWithPassword({
                username: username,
                password: password,
            });

            runInAction(() => {
                this.error = null;
                this.username = username;
                this.isLoading = false;
                this.credentials = credentials;

                // This has to be last! Because setting isAuthenticated to true triggers the <PublicRoute> component
                // to start redirecting in which case the credentials must be valid.
                this.isAuthenticated = true;
            });
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
            });

            if (error instanceof APIError) {
                if (error.statusCode === STATUS_CODE_UNAUTHORIZED) {
                    this.wipe("PasswordWrong");
                } else {
                    this.wipe("Unknown");
                }
            }
        }
    };

    logout = () => {
        this.wipe(null);
    };

    tokenExchange = async () => {
        this.isLoading = true;

        try {
            if (this.credentials === null) {
                throw new Error(`No valid credentials are available`);
            }

            const res = await fetch(`${config.API_BASE_URL}/api/v1/auth/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    refresh_token: this.credentials.refresh_token,
                }),
            });

            if (!res.ok) {
                throw Error(`${res.status}: ${res.statusText}`);
            }

            const { access_token, refresh_token, expires_in, token_type } = await res.json();

            runInAction(() => {
                this.credentials = {
                    access_token,
                    refresh_token,
                    expires_in,
                    token_type,
                };
                this.error = null;
                this.isAuthenticated = true;
                this.isLoading = false;
            });
        } catch (e) {
            this.wipe("Unknown");
        }
    };

    private wipe(error: AuthError | null) {
        this.credentials = null;
        this.error = error;
        this.isAuthenticated = false;
        this.isLoading = false;
        this.userProfile = null;
    }
}

let authStore: Auth;
if (process.env.NODE_ENV === "test") {
    class MockAuth {
        credentials: any = null;
        isAuthenticated = false;
        error: any = null;
        isRehydrated = true;

        constructor() {
            makeAutoObservable(this);
        }

        loginWithPassword = () => undefined;
        dismissError = () => undefined;
        logout = () => undefined;
    }

    authStore = new MockAuth() as any; // no localstorage support in node env
} else {
    authStore = new Auth();
}

// development, make auth available on window object...
(window as any).auth = authStore;

// singleton, exposes an instance by default
export { authStore };
