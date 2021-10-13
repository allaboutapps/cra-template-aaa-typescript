import { makeAutoObservable } from "mobx";
import { ILocales } from "../i18n/ILocales";
import { DEFAULT_LOCALE } from "../i18n/util";

class GeneralStore {
    locale: ILocales = DEFAULT_LOCALE;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    };

    setLocale = (locale: ILocales) => {
        this.locale = locale;
    };
}

const generalStore = new GeneralStore();

export { generalStore };
