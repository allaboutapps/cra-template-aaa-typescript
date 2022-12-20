import { makeAutoObservable } from "mobx";
import { DEFAULT_LOCALE } from "../i18n/i18n_defaults";
import { ILocales } from "../i18n/ILocales";

class GeneralStore {
    locale: ILocales = DEFAULT_LOCALE;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    };
}

const generalStore = new GeneralStore();

export { generalStore };
