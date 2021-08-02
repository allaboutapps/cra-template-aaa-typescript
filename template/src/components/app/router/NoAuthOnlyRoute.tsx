import { observer } from "mobx-react";
import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { Routes } from "./Routes";
import { authStore } from "../../../stores/AuthStore";
import { LoadingOverlay } from "../../ui/LoadingOverlay";
import { DashboardRoutes } from "../../dashboard/router/DashboardRoutes";

export const NoAuthOnlyRoute = observer(({ component: Component, ...props }: any) => {
    if (!authStore.isRehydrated) {
        return <LoadingOverlay />;
    }

    return (
        <Route
            {...props}
            render={(renderProps) =>
                !authStore.isAuthenticated ? (
                    <Component {...renderProps} />
                ) : (
                    <Redirect
                        to={{
                            pathname: DashboardRoutes.ROOT,
                            state: { from: renderProps.location },
                        }}
                    />
                )
            }
        />
    );
});
