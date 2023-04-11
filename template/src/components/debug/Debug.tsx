import { Dialog, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { DebugDesign } from "./DebugDesign";
import { DebugFunctionality } from "./DebugFunctionality";
import { useEffect, useState } from "react";
import { IDebugTab, useDebugStore } from "../../stores/debugStore";

export const Debug = ({ debugTab: initialDebugTab }: { debugTab?: IDebugTab }) => {
    const [open, setOpen] = useState(true);
    const closeDialog = useDebugStore((state) => state.closeDialog);

    const [debugTab, setDebugTab] = useDebugStore((state) => [state.debugTab, state.setDebugTab]);
    useEffect(() => {
        if (initialDebugTab) {
            setDebugTab(initialDebugTab);
        }
    }, [initialDebugTab, setDebugTab]);

    return (
        <Dialog
            open={open}
            maxWidth="xl"
            fullWidth
            onClose={(event, reason) => {
                setOpen(false);
                closeDialog();
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 40,
                    flexGrow: 1,
                }}
            >
                <h1>Debug</h1>
                <p style={{ marginTop: 8 }}>
                    A site for debugging to check the design of components and customize general functionality.
                </p>
                <ToggleButtonGroup
                    color="primary"
                    exclusive
                    onChange={(event, value) => {
                        setDebugTab(value as IDebugTab);
                    }}
                    style={{ marginTop: 16, alignSelf: "flex-start" }}
                >
                    <ToggleButton disableRipple selected={debugTab === "design"} value="design">
                        Design
                    </ToggleButton>
                    <ToggleButton disableRipple selected={debugTab === "functionality"} value="functionality">
                        Functionality
                    </ToggleButton>
                </ToggleButtonGroup>
                {debugTab === "design" && <DebugDesign />}
                {debugTab === "functionality" && <DebugFunctionality />}
            </div>
        </Dialog>
    );
};
