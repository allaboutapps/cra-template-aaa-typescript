import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

interface IProps {
    isVisible: boolean;
}

export const LoadingOverlay = ({ isVisible }: IProps) => (
    <div
        style={{
            display: isVisible ? "flex" : "none",
            position: "fixed",
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.75)",
            alignItems: "center",
            justifyContent: "center",
            left: 0,
            top: 0,
            zIndex: 9999
        }}
    >
        <CircularProgress color="secondary" />
    </div>
)


