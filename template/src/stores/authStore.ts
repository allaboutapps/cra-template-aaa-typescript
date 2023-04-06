import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface ICredentials {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
}

interface StoreState {
    credentials: ICredentials | null;
    setCredentials: (credentials: ICredentials | null) => void;
    isAuthenticated: () => boolean;
    logout: () => void;
}

// Didn't use combine here, so we can use setCredentials() in logout()
export const useAuthStore = create<StoreState>()(
    devtools(
        persist(
            (set, get) => {
                return {
                    credentials: null,

                    setCredentials: (credentials) => set(() => ({ credentials })),

                    isAuthenticated: () => !!get().credentials,

                    logout() {
                        get().setCredentials(null);
                    },
                };
            },
            {
                name: "auth-store-storage",
            },
        ),
    ),
);

// Just an alias for use outside of React components
export const authStore = useAuthStore;
