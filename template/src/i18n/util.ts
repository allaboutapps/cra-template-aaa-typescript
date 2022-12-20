import { PrimitiveType } from "intl-messageformat";
import { createIntl, createIntlCache } from "react-intl";
import german from "./de.json";
import english from "./en.json";
import { generalStore } from "../stores/GeneralStore";
import { ILocales } from "./ILocales";
import { action } from "mobx";
import { debugStore } from "../stores/DebugStore";
import { DEFAULT_LOCALE } from "./i18nDefaults";

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

function returnString(messageId: MessageIDS, translation: string) {
    const showStringKeys = debugStore.showStringKeys;
    return showStringKeys ? `${String(messageId)} (${translation})` : translation;
}


const t = (messageId: MessageIDS, values?: Record<string, PrimitiveType>) => {
    return returnString(messageId, intl.formatMessage({ id: messageId }, values));
};

export { intl, intlMessages, setLocale, t };
