import * as React from "react";
import { CircularProgress } from "@mui/material";

export const LoadingOverlay = (props: { delayMs?: number }) => {
    const [show, setShow] = React.useState(false);
    React.useEffect(() => {
        const timeout = setTimeout(() => setShow(true), props.delayMs ?? 0);
        return () => clearTimeout(timeout);
    }, [props.delayMs]);

    if (!show) {
        return null;
    }

    return (
        <div
            style={{
                display: "flex",
                position: "fixed",
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.75)",
                alignItems: "center",
                justifyContent: "center",
                left: 0,
                top: 0,
                zIndex: 9999,
            }}
        >
            <CircularProgress color="secondary" />
        </div>
    );
};
