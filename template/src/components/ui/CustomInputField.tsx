import { TextField, TextFieldProps } from "@mui/material";
import { FieldInputProps } from "formik";
import * as React from "react";

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
            <span
                style={{
                    color: "#d32f2f",
                    display: "block",
                    minHeight: 18,
                    width: "100%",
                    marginTop: 4,
                    marginBottom: 10,
                    fontSize: 12,
                }}
            >
                {showError && errorMessage}
            </span>
        </div>
    );
};
