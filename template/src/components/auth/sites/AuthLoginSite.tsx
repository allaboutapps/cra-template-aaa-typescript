import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { t } from "../../../i18n/util";
import { useLogin } from "../../../network/api/useLogin";
import { useAuthStore } from "../../../stores/authStore";
import { useGeneralStore } from "../../../stores/generalStore";
import { usePushRoute } from "../../app/router/history";
import { CustomInputField } from "../../ui/CustomInputField";
import { Colors } from "../../util/Colors";
import { ImageLogo } from "../../util/Images";
import { DashboardRoutes } from "../../dashboard/router/DashboardRoutes";
import { AxiosError } from "axios";

interface ILoginValues {
    email: string;
    password: string;
}

export const AuthLoginSite = () => {
    const { handleSubmit, formState, control } = useForm<ILoginValues>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onTouched",
        resolver: yupResolver(
            Yup.object().shape({
                email: Yup.string()
                    .email(t("screen.login.form.email.validation_error"))
                    .required(t("screen.login.form.email.validation_error"))
                    .trim(),
                password: Yup.string()
                    .min(6, t("screen.login.form.password.validation_error"))
                    .required(t("screen.login.form.password.validation_error")),
            }),
        ),
    });

    const [error, setError] = React.useState<string>();
    const pushRoute = usePushRoute();

    const isRehydrated = useAuthStore.persist.hasHydrated();

    const loginMutation = useLogin();

    const setIsLoading = useGeneralStore((state) => state.setIsLoading);

    const onSubmit = async (model: ILoginValues) => {
        setIsLoading(true);
        setError("");

        try {
            await loginMutation.mutateAsync({ username: model.email, password: model.password });
            pushRoute(DashboardRoutes.ROOT);
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(`${t("screen.login.error_during_login")}: ${error.response?.status}`);
            }
        }

        setIsLoading(false);
    };

    if (!isRehydrated) {
        return null;
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "50% 0%",
                padding: 24,
            }}
        >
            <ImageLogo style={{ maxWidth: 200 }} />
            <div
                style={{
                    background: "#fff",
                    borderRadius: 4,
                    width: "100%",
                    maxWidth: 320,
                    marginTop: 40,
                }}
            >
                <div
                    style={{
                        background: Colors.PRIMARY_COLOR,
                        color: "#fff",
                        textTransform: "uppercase",
                        padding: 24,
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
                        fontWeight: "bold",
                    }}
                >
                    {t("screen.login.title")}
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ padding: 24, border: `1px solid ${Colors.PRIMARY_COLOR}`, borderTop: "none" }}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={(formProps) => (
                            <CustomInputField
                                label={t("screen.login.form.email.label")}
                                type="email"
                                autoComplete="username"
                                {...formProps}
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        render={(formProps) => (
                            <CustomInputField
                                label={t("screen.login.form.password.label")}
                                type="password"
                                autoComplete="current-password"
                                {...formProps}
                            />
                        )}
                    />
                    {error && <div style={{ color: Colors.ERROR, fontSize: 14 }}>{error}</div>}
                    <Button
                        variant="contained"
                        style={{
                            boxShadow: "none",
                            borderRadius: 24,
                            marginTop: 24,
                        }}
                        fullWidth
                        disabled={formState.isSubmitting}
                        type="submit"
                    >
                        {t("screen.login.form.submit")}
                    </Button>
                </form>
            </div>
        </div>
    );
};
