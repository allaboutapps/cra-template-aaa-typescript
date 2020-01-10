import * as React from "react";
import * as mui from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField";
import { withFormsy } from "formsy-react";
import { IFormsyComponentProps } from "../externals/IFormsyComponentProps";

type IProps = IFormsyComponentProps & TextFieldProps & {
    showErrorOnBlurOnly: boolean;
    /**
     * Specify validations on input and prevent invalid input.
     * Example:
     * inputValidations={[
     *      FormValidations.isNumeric,
     *      FormValidations.isInRange(0, 50)
     * ]}
     */
    inputValidations?(value: string): boolean | ((value: string) => boolean)[];
    onBlur?(): any;
};

interface IState {
    blurred: boolean;
}

class CustomInputFieldUnwrapped extends React.Component<IProps, IState> {

    state = {
        blurred: false
    }

    changeValue = (event: any) => {
        const { inputValidations, onChange, setValue } = this.props

        // Check input validations and return in case value is not valid
        // which discards changes.
        if (inputValidations) {
            if (typeof inputValidations === "function") {
                if (!inputValidations(event.currentTarget.value)) {
                    return;
                }
            } else if ((inputValidations as any) instanceof Array) {
                for (const validator of (inputValidations as Function[])) {
                    if (!validator(event.currentTarget.value)) {
                        return;
                    }
                }
            }
        }

        if (onChange) {
            onChange(event);
        }

        setValue(event.target.value);
    }

    handleBlur = () => {
        const { onBlur, setValue, getValue } = this.props

        if (onBlur) {
            onBlur();
        }

        // Trim whitespace characters on blur.
        setValue(getValue() && getValue().trim());

        this.setState({ blurred: true });
    }

    handleFocus = () => {
        this.setState({ blurred: false });
    }

    shouldShowError = () => {
        const { showErrorOnBlurOnly } = this.props

        return !showErrorOnBlurOnly || (showErrorOnBlurOnly && this.state.blurred);
    }

    render() {
        const { getErrorMessage, style, label, getValue, type, autoComplete, required } = this.props

        const errorMessage = this.shouldShowError() ? getErrorMessage() : "";

        return (
            <div style={style}>
                <mui.TextField
                    label={label}
                    value={getValue() || ""}
                    onChange={this.changeValue}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    fullWidth
                    type={type}
                    autoComplete={autoComplete}
                    required={required}
                    error={!!errorMessage}
                    margin="dense"
                    aria-label={this.props["aria-label"]}
                />
                <span
                    style={{
                        color: "#f00",
                        display: "block",
                        minHeight: 18,
                        width: "100%",
                        marginTop: 4,
                        marginBottom: 10,
                        fontSize: 12
                    }}
                >
                    {errorMessage}
                </span>
            </div>
        );
    }
}

export const CustomInputField = withFormsy(CustomInputFieldUnwrapped);
