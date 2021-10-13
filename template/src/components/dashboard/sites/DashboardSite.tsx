import { Button } from "@mui/material";
import { observer } from "mobx-react";
import * as React from "react";
import { t, setLocale } from "../../../i18n/util";
import { generalStore } from "../../../stores/GeneralStore";
import { authStore } from "../../../stores/AuthStore";
import { Routes } from "../../app/router/Routes";
import { history } from "../../app/router/history";

export const DashboardSite = observer(() => {
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
                        history.push(Routes.ROOT);
                    }}
                >
                    {t("common.logout")}
                </Button>
            </div>
        </h1>
    );
});
