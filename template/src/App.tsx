import { ThemeProvider } from "@mui/material";
import { observer } from "mobx-react";
import * as React from "react";
import { RawIntlProvider } from "react-intl";
import { AppRouter } from "./components/app/router/AppRouter";
import { theme } from "./components/util/Theme";
import { intl } from "./i18n/util";
import { authStore } from "./stores/AuthStore";
import { generalStore } from "./stores/GeneralStore";

const App: React.FunctionComponent = observer(() => {
    if (!authStore.isRehydrated) {
        return null;
    }

    return (
        <ThemeProvider theme={theme}>
            <RawIntlProvider value={intl} key={generalStore.locale}>
                <AppRouter />
            </RawIntlProvider>
        </ThemeProvider>
    );
});

export default App;
