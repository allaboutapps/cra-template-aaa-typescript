import { DEFAULT_LOCALE } from "../i18n/i18nDefaults";
import { ILocales } from "../i18n/ILocales";

import { devtools, combine } from "zustand/middleware";
import { create } from "zustand";

const ERROR_QUEUEING = false;

export const useGeneralStore = create(
    devtools(
        combine(
            {
                locale: DEFAULT_LOCALE as ILocales,
                isLoading: false,
                _errors: [] as { message: string; error?: any }[],
            },
            (set, get) => ({
                setLocale: (locale: ILocales) => set(() => ({ locale })),

                setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),

                getError: () => (get()._errors.length > 0 ? get()._errors[0] : undefined),

                setError(message: string, error?: any) {
                    if (ERROR_QUEUEING) {
                        set(() => ({ _errors: get()._errors.concat([{ message, error }]) }));
                    } else {
                        set(() => ({ _errors: [{ message, error }] }));
                    }
                },

                popError() {
                    if (ERROR_QUEUEING) {
                        // Remove oldest error
                        set(() => ({ _errors: get()._errors.slice(1) }));
                    } else {
                        // this._error = [];
                        set(() => ({ _errors: [] }));
                    }
                },
            }),
        ),
    ),
);

// Just an alias for use outside of React components
export const generalStore = useGeneralStore;
