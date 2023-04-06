import { ThemeProvider } from "@mui/material";
import * as React from "react";
import { RawIntlProvider } from "react-intl";
import { QueryClientProvider } from "react-query";
import { AppRouter } from "./components/app/router/AppRouter";
import { theme } from "./components/util/Theme";
import { intl } from "./i18n/util";
import { reactQueryClient } from "./network/reactQueryClient";
import { useAuthStore } from "./stores/authStore";
import { useGeneralStore } from "./stores/generalStore";
import { addCustomYupValidators } from "./util/Yup";
import { useDebugCommands } from "./hooks/useDebugCommands";

addCustomYupValidators();

const App: React.FunctionComponent = () => {
    const locale = useGeneralStore((state) => state.locale);

    useDebugCommands();

    const isRehydrated = useAuthStore.persist.hasHydrated();
    if (!isRehydrated) {
        return null;
    }

    return (
        <ThemeProvider theme={theme}>
            <RawIntlProvider value={intl} key={locale}>
                <QueryClientProvider client={reactQueryClient}>
                    <AppRouter />
                </QueryClientProvider>
            </RawIntlProvider>
        </ThemeProvider>
    );
};

export default App;
