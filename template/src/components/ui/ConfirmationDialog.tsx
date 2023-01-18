import { Button, IconButton, styled } from "@mui/material";
import * as React from "react";
import { CustomDialog } from "./CustomDialog";
import { Icon } from "./Icon";

const HeaderContainer = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

const ButtonContainer = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 16,
});

export const ConfirmationDialog = ({
    open,
    title,
    message,
    submitLabel,
    cancelLabel,
    onSubmit,
    onCancel,
    hideCancel,
}: {
    open?: boolean;
    title: string;
    message: React.ReactNode;
    submitLabel?: string;
    cancelLabel?: string;
    onSubmit: () => void;
    onCancel: () => void;
    hideCancel?: boolean;
}) => {
    return (
        <CustomDialog open={open || false}>
            <HeaderContainer>
                <h1 style={{ fontSize: 32 }}>{title}</h1>
                <IconButton onClick={onCancel} style={{ marginLeft: 4 }}>
                    <Icon name="close" />
                </IconButton>
            </HeaderContainer>
            <p style={{ marginTop: 16 }}>{message}</p>
            <ButtonContainer style={{ marginTop: 32 }}>
                {!hideCancel && (
                    <Button onClick={onCancel} variant="text">
                        {cancelLabel}
                    </Button>
                )}
                <Button variant="contained" onClick={onSubmit}>
                    {submitLabel}
                </Button>
            </ButtonContainer>
        </CustomDialog>
    );
};
