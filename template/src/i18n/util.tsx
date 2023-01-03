import { PrimitiveType } from "intl-messageformat";
import { createIntl, createIntlCache, FormattedMessage } from "react-intl";
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

export const tHtml = (messageId: MessageIDS, values?: Record<string, any>) => {
    const showStringKeys = debugStore.showStringKeys;
    return showStringKeys ? (
        `${String(messageId)} (${intl.formatMessage({ id: messageId })})`
    ) : (
        <FormattedMessage
            key={messageId}
            id={messageId}
            values={{
                ...values,
                b: (chunks) => {
                    return <b>{chunks}</b>;
                },
                br: () => {
                    return <br />;
                },
                div: (chunks) => {
                    return <div>{chunks}</div>;
                },
                sup: (chunks) => {
                    return <sup>{chunks}</sup>;
                },
                p: (chunks) => {
                    return <p>{chunks}</p>;
                },
                // aPaymentConditions: (chunks) => {
                //     const link: MessageIDS = "links.payment_conditions";
                //     return (
                //         <a href={intl.formatMessage({ id: link })} target="_blank" rel="noopener noreferrer">
                //             {chunks}
                //         </a>
                //     );
                // },
                // aPrivacyPolicy: (chunks) => {
                //     const link: MessageIDS = "links.privacy_policy";
                //     return (
                //         <a href={intl.formatMessage({ id: link })} target="_blank" rel="noopener noreferrer">
                //             {chunks}
                //         </a>
                //     );
                // },
            }}
        />
    );
};

export { intl, intlMessages, setLocale, t };
