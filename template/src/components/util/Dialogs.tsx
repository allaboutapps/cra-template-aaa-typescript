import { t } from "../../i18n/util";

type ConfirmationOptions = {  count?: number };

// https://stackoverflow.com/a/57300713
const getSingleOrMultiKey = <T extends string>(singleKey: T, { count }: ConfirmationOptions = {}) =>
    count && count > 1 ? (`${singleKey}.multi` as `${T}.multi`) : singleKey;

const getDialogConfigurations = (options?: ConfirmationOptions) => ({
    add: {
        title: t(getSingleOrMultiKey("addDialog.title", options)),
        message: t(getSingleOrMultiKey("addDialog.message", options), { count: options?.count }),
        submitLabel: t(getSingleOrMultiKey("addDialog.submitLabel", options)),
        cancelLabel: t("common.no"),
    },
    delete: {
        title: t(getSingleOrMultiKey("deleteDialog.title", options)),
        message: t(getSingleOrMultiKey("deleteDialog.message", options), { count: options?.count }),
        submitLabel: t(getSingleOrMultiKey("deleteDialog.submitLabel", options)),
        cancelLabel: t("common.no"),
    },
});

export type DialogVariant = keyof ReturnType<typeof getDialogConfigurations>;

export const getDialogConfiguration = (variant: DialogVariant, options?: ConfirmationOptions) => {
    return getDialogConfigurations(options)[variant];
};
