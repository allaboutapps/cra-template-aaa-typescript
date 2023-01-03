import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import { FieldInputProps, FormikState, getIn } from "formik";
import * as React from "react";
import { FieldError } from "./FieldError";

type IProps = TextFieldProps & {
    field: FieldInputProps<string>;
    onChange: () => void;
    form: FormikState<any>;
    showValidationErrorText?: boolean;
    selectOptions?: { value: string; label: string }[];
};

export const CustomInputField = ({
    style,
    label,
    type,
    autoComplete,
    multiline,
    minRows,
    maxRows,
    required,
    form,
    field,
    "aria-label": ariaLabel,
    placeholder,
    showValidationErrorText = true,
    select,
    selectOptions,
    onChange,
}: IProps) => {
    const fieldError = getIn(form.errors, field.name);
    const showError = getIn(form.touched, field.name) && !!fieldError;

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        field.onChange(event);

        if (onChange) {
            onChange();
        }
    };

    return (
        <div style={style}>
            <TextField
                select={select}
                label={required ? `${label} *` : label}
                value={field.value}
                name={field.name}
                onBlur={field.onBlur}
                onChange={handleChange}
                fullWidth
                type={type}
                autoComplete={autoComplete}
                error={showError}
                margin="dense"
                aria-label={ariaLabel}
                variant="outlined"
                placeholder={placeholder}
                multiline={multiline}
                minRows={minRows}
                maxRows={maxRows}
                // For date inputs shrink does not work correctly so explicitly set it.
                // See here: https://mui.com/material-ui/react-text-field/#shrink
                InputLabelProps={{ shrink: type === "date" ? true : undefined }}
            >
                {selectOptions?.map((selectOption) => (
                    <MenuItem key={selectOption.value} value={selectOption.value}>
                        {selectOption.label}
                    </MenuItem>
                ))}
            </TextField>
            {showValidationErrorText && <FieldError>{showError ? fieldError : ""}</FieldError>}
        </div>
    );
};
