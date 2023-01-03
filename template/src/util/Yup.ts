import * as Yup from "yup";
// import * as ibantools from "ibantools";

declare module 'yup' {
    interface StringSchema {
        iban(errorMEssage: string): StringSchema
    }
}

export function addCustomYupValidators() {
    // Yup.addMethod(Yup.string, "iban", function (errorMessage) {
    //     return this.test(`iban`, errorMessage, function (value) {
    //         const { path, createError } = this;

    //         return (
    //             ibantools.isValidIBAN(value || "") ||
    //             createError({ path, message: errorMessage })
    //         );
    //     });
    // });
}
