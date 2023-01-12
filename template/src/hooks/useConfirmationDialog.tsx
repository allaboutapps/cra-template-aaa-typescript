import * as React from "react";
import { ConfirmationDialog } from "../components/ui/ConfirmationDialog";

export type UseConfirmationDialogProps = {
    title: string;
    message: React.ReactNode;
    submitLabel?: string;
    onSubmit?: () => void;
    onCancel?: () => void;
    cancelLabel?: string;
    hideCancel?: boolean;
};

export const useConfirmationDialog = ({
    title,
    message,
    submitLabel,
    onSubmit,
    onCancel,
    cancelLabel,
    hideCancel,
}: UseConfirmationDialogProps) => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        if (onCancel) {
            onCancel();
        }

        setOpen(false);
    };

    const component = (
        <ConfirmationDialog
            open={open}
            title={title}
            message={message}
            submitLabel={submitLabel}
            onSubmit={() => {
                handleClose();
                if (onSubmit) {
                    onSubmit();
                }
            }}
            cancelLabel={cancelLabel}
            onCancel={handleClose}
            hideCancel={hideCancel}
        />
    );

    return {
        open() {
            setOpen(true);
        },

        component,
    };
};
