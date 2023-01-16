import { makeAutoObservable } from "mobx";
import { ILocales } from "../i18n/ILocales";
import { DEFAULT_LOCALE } from "../i18n/util";

const ERROR_QUEUEING = false;
class GeneralStore {
    locale: ILocales = DEFAULT_LOCALE;
    isLoading = false;
    _error: { message: string; error?: any }[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    };

    // Remove oldest error
    popError() {
        if (ERROR_QUEUEING) {
            this._error = this._error.slice(1);
        } else {
            this._error = [];
        }
    }

    get error() {
        return this._error.length > 0 ? this._error[0] : undefined;
    }

    setError(message: string, error?: any) {
        if (ERROR_QUEUEING) {
            this._error = this._error.concat([{ message, error }]);
        } else {
            this._error = [{ message, error }];
        }
    }
}

const generalStore = new GeneralStore();

export { generalStore };
