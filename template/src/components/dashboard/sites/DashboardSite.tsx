import { Button } from "@mui/material";
import { observer } from "mobx-react";
import { setLocale, t } from "../../../i18n/util";
import { authStore } from "../../../stores/AuthStore";
import { generalStore } from "../../../stores/GeneralStore";
import { usePushRoute } from "../../app/router/history";
import { BaseRoutes } from "../../app/router/BaseRoutes";

export const DashboardSite = observer(() => {
    const pushRoute = usePushRoute();
    return (
        <h1 style={{ margin: 24, textAlign: "center" }}>
            <p>{t("screen.dashboard.hello")}</p>
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
            <div>
                <Button
                    onClick={() => {
                        authStore.logout();
                        pushRoute(BaseRoutes.ROOT);
                    }}
                >
                    {t("common.logout")}
                </Button>
            </div>
        </h1>
    );
});
