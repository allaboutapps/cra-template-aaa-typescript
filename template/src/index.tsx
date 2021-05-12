import * as ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { shouldPolyfill } from "@formatjs/intl-pluralrules/should-polyfill";

// https://formatjs.io/docs/polyfills/intl-pluralrules/#dynamic-import--capability-detection
async function polyfill(locale: string) {
    if (shouldPolyfill()) {
        // Load the polyfill 1st BEFORE loading data
        await import("@formatjs/intl-pluralrules/polyfill");
    }

    if ((Intl.PluralRules as typeof Intl.PluralRules & { polyfilled: boolean }).polyfilled) {
        switch (locale) {
            default:
                await import("@formatjs/intl-pluralrules/locale-data/en");
                break;
            case "de":
                await import("@formatjs/intl-pluralrules/locale-data/de");
                break;
        }
    }
}

(async () => {
    await polyfill("en");
    await polyfill("de");

    const App = require("./App").default;
    require("./index.css");

    ReactDOM.render(<App />, document.getElementById("root"));

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.unregister();
})();
