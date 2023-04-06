import { Button } from "@mui/material";
import { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { t } from "../../../i18n/util";
import { useLogin } from "../../../network/api/useLogin";
import { useAuthStore } from "../../../stores/authStore";
import { useGeneralStore } from "../../../stores/generalStore";
import { usePushRoute } from "../../app/router/history";
import { DashboardRoutes } from "../../dashboard/router/DashboardRoutes";
import { CustomInputField } from "../../ui/CustomInputField";
import { Colors } from "../../util/Colors";
import { ImageLogo } from "../../util/Images";

interface ILoginValues {
    email: string;
    password: string;
}

export const AuthLoginSite = () => {
    const [error, setError] = React.useState<string>();
    const pushRoute = usePushRoute();

    const isRehydrated = useAuthStore.persist.hasHydrated();

    const loginMutation = useLogin();

    const setIsLoading = useGeneralStore((state) => state.setIsLoading);

    const handleSubmit = async (model: ILoginValues) => {
        setIsLoading(true);
        setError("");

        try {
            await loginMutation.mutateAsync({ username: model.email, password: model.password });
            pushRoute(DashboardRoutes.ROOT);
        } catch (error) {
            const axiosError = error as AxiosError;
            setError(`${t("screen.login.error_during_login")}: ${axiosError.response?.status}`);
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
                <div style={{ padding: 24, border: `1px solid ${Colors.PRIMARY_COLOR}`, borderTop: "none" }}>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .email(t("screen.login.form.email.validation_error"))
                                .required(t("screen.login.form.email.validation_error"))
                                .trim(),
                            password: Yup.string()
                                .min(6, t("screen.login.form.password.validation_error"))
                                .required(t("screen.login.form.password.validation_error")),
                        })}
                        validateOnBlur
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <Field
                                    component={CustomInputField}
                                    label={t("screen.login.form.email.label")}
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="username"
                                    errorMessage={errors.email}
                                    isTouched={touched.email}
                                />
                                <Field
                                    component={CustomInputField}
                                    label={t("screen.login.form.password.label")}
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    errorMessage={errors.password}
                                    isTouched={touched.password}
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
                                    disabled={isSubmitting}
                                    type="submit"
                                >
                                    {t("screen.login.form.submit")}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};
