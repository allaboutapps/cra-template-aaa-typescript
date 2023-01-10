import { Button, IconButton, styled } from "@mui/material";
import * as React from "react";
import { CustomDialog } from "./CustomDialog";
import { Icon } from "./Icon";

const HeaderContainer = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

const MessageContainer = styled("div")({
    textAlign: "left",
});

const ButtonContainer = styled("div")({
    display: "flex",
    alignItems: "center",
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
        <CustomDialog open={open}>
            <HeaderContainer>
                <h1 style={{ fontSize: 32 }}>{title}</h1>
                <IconButton onClick={onCancel}>
                    <Icon name="close" />
                </IconButton>
            </HeaderContainer>
            <MessageContainer style={{ marginTop: 16 }}>{message}</MessageContainer>
            <ButtonContainer style={{ marginTop: 32 }}>
                {!hideCancel && (
                    <Button onClick={onCancel} style={{ backgroundColor: "transparent" }}>
                        {cancelLabel}
                    </Button>
                )}
                <Button variant="contained" fullWidth onClick={onSubmit}>
                    {submitLabel}
                </Button>
            </ButtonContainer>
        </CustomDialog>
    );
};
