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
                // This is a more complex example of how to use it with e.g. <a> or other HTML elements.
                // This example defines the attributes manually, but lets you dynamically
                // set the <a> content. The "chunks" param is everything you put between
                // your custom tags ("aPrivacyPolicy" are the tags in this example).
                // If you write "<aPrivacyPolicy>this is a link to my privacy policy</aPrivacyPolicy>" in your translation
                // you will get a link as defined below with the text "this is a link to my privacy policy".
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
