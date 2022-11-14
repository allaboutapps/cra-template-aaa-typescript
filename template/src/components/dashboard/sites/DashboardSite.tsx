import { Button } from "@mui/material";
import { observer } from "mobx-react";
import { setLocale, t } from "../../../i18n/util";
import { authStore } from "../../../stores/AuthStore";
import { generalStore } from "../../../stores/GeneralStore";
import { usePushRoute } from "../../app/router/history";
import { BaseRoutes } from "../../app/router/BaseRoutes";
import { sleep } from "../../../util/helpers";

export const DashboardSite = observer(() => {
    const pushRoute = usePushRoute();

    const languages = (
        <div>
            <Button
                variant="outlined"
                onClick={() => {
                    setLocale("de");
                }}
                style={{ marginRight: 8 }}
                disabled={generalStore.locale === "de"}
            >
                {t("language.german")}
            </Button>
            <Button
                variant="outlined"
                onClick={() => {
                    setLocale("en");
                }}
                disabled={generalStore.locale === "en"}
            >
                {t("language.english")}
            </Button>
        </div>
    );

    const loading = (
        <>
            <Button
                variant="outlined"
                onClick={async () => {
                    generalStore.isLoading = true;
                    await sleep(100);
                    generalStore.isLoading = false;
                }}
            >
                {t("button.loadingShort")}
            </Button>
            <Button
                variant="outlined"
                onClick={async () => {
                    generalStore.isLoading = true;
                    await sleep(1000);
                    generalStore.isLoading = false;
                }}
            >
                {t("button.loadingLong")}
            </Button>
        </>
    );

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginTop: 16,
                maxWidth: 400,
                margin: "0 auto",
                alignItems: "center",
            }}
        >
            <h1 style={{ margin: 24, textAlign: "center" }}>{t("screen.dashboard.hello")}</h1>
            {languages}
            {loading}
            <Button
                onClick={() => {
                    authStore.logout();
                    pushRoute(BaseRoutes.ROOT);
                }}
            >
                {t("common.logout")}
            </Button>
        </div>
    );
});
