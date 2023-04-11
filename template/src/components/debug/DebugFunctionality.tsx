import { Button } from "@mui/material";

import { useDebugStore } from "../../stores/debugStore";

import { setLocale, t } from "../../i18n/util";
import { DebugBox } from "./DebugBox";
import { useGeneralStore } from "../../stores/generalStore";

const I18n = () => {
    const locale = useGeneralStore((state) => state.locale);
    const [stringKeysVisible, showStringKeys] = useDebugStore((state) => [
        state.stringKeysVisible,
        state.showStringKeys,
    ]);

    return (
        <div>
            <h2 style={{ marginBottom: 24 }}>i18n</h2>
            <Button
                variant="contained"
                onClick={() => {
                    setLocale("de");
                }}
                style={{ marginRight: 8 }}
                disabled={locale === "de"}
            >
                {t("language.german")}
            </Button>
            <Button
                variant="contained"
                onClick={() => {
                    setLocale("en");
                }}
                disabled={locale === "en"}
            >
                {t("language.english")}
            </Button>

            <div style={{ marginTop: 16 }}>
                <Button
                    onClick={() => {
                        showStringKeys(!stringKeysVisible);
                    }}
                    variant="contained"
                    color={stringKeysVisible ? "error" : "primary"}
                >
                    {!stringKeysVisible ? "String keys anzeigen" : "String keys ausblenden"}
                </Button>
            </div>
        </div>
    );
};

const Misc = () => {
    const [reactQueryDevtoolsEnabled, enableReactQueryDevtools] = useDebugStore((state) => [
        state.reactQueryDevtoolsEnabled,
        state.enableReactQueryDevtools,
    ]);

    return (
        <div>
            <h2 style={{ marginBottom: 24 }}>Misc</h2>
            <Button
                onClick={() => {
                    enableReactQueryDevtools(!reactQueryDevtoolsEnabled);
                }}
                variant="contained"
                color={reactQueryDevtoolsEnabled ? "error" : "primary"}
            >
                {reactQueryDevtoolsEnabled ? "ReactQuery Devtools deaktivieren" : "ReactQuery Devtools aktivieren"}
            </Button>
        </div>
    );
};

export const DebugFunctionality = () => (
    <>
        <DebugBox>
            <I18n />
        </DebugBox>
        <DebugBox>
            <Misc />
        </DebugBox>
    </>
);
