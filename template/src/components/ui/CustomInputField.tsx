import { TextField, TextFieldProps } from "@mui/material";
import { FieldInputProps } from "formik";
import * as React from "react";
import { FieldError } from "./FieldError";

type IProps = TextFieldProps & {
    errorMessage?: string;
    field: FieldInputProps<string>;
    isTouched?: boolean;
};

export const CustomInputField = ({
    style,
    label,
    type,
    autoComplete,
    required,
    errorMessage,
    field,
    isTouched,
    ...props
}: IProps) => {
    const showError = isTouched && !!errorMessage;

    return (
        <div style={style}>
            <TextField
                label={required ? `${label} *` : label}
                value={field.value}
                name={field.name}
                onChange={field.onChange}
                onBlur={field.onBlur}
                fullWidth
                type={type}
                autoComplete={autoComplete}
                error={showError}
                margin="dense"
                aria-label={props["aria-label"]}
                variant="standard"
            />
            <FieldError>{showError ? errorMessage : ""}</FieldError>
        </div>
    );
};
