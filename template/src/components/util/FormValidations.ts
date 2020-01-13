import * as Formsy from "formsy-react";

const isNumeric = (value: string) => {
    if (value === undefined) {
        return false;
    }

    return value.length === 0 || /^[0-9]+$/i.test(value);
}

const isInRange = (min: number, max: number) => {
    return (value: string) => {
        return isNumeric(value) && Number(value) >= min && Number(value) <= max;
    };
}

let rulesAdded = false;

const addRules = () => {
    // Only add the rules once.
    if (!rulesAdded) {
        rulesAdded = true;

        // Don't add isNumeric to formsy because that rule already exists.

        Formsy.addValidationRule("isInRange", (values: any, value: any, param: any) => {
            return isInRange(param[0], param[1])(value);
        });
    }
}

export const FormValidations = {
    isNumeric,
    isInRange,
    addRules
};
