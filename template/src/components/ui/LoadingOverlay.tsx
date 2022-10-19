import { CircularProgress } from "@mui/material";

export const LoadingOverlay = () => (
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
