import { PrimitiveType } from "intl-messageformat";
import { createIntl, createIntlCache } from "react-intl";
import { german } from "./de";
import { english } from "./en";
import { generalStore } from "../stores/GeneralStore";
import { ILocales } from "./ILocales";
import { action } from "mobx";

const DEFAULT_LOCALE = "en";

type IMessages = {
    [locale in ILocales]: {
        [message: string]: string;
    };
};

const intlMessages: IMessages = {
    de: german,
    en: english,
};

const cache = createIntlCache();

let intl = createIntl(
    {
        locale: DEFAULT_LOCALE,
        messages: intlMessages[DEFAULT_LOCALE],
    },
    cache,
);

type MessageIDS = keyof typeof german;

const setLocale = action("setLocale", (locale: ILocales) => {
    intl = createIntl(
        {
            locale: locale,
            messages: intlMessages[locale],
        },
        cache,
    );

    generalStore.locale = locale;
    document.documentElement.lang = locale;

    console.log(`%cSet locale to "${locale}".`, "background: #eee; color: #666;");
});

const t = (messageId: MessageIDS, values?: Record<string, PrimitiveType>) => {
    return intl.formatMessage({ id: messageId }, values);
};

export { DEFAULT_LOCALE, intl, intlMessages, setLocale, t };
