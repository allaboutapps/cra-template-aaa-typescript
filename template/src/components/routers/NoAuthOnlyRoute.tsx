import { observer } from "mobx-react";
import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { authStore } from "../../stores/AuthStore";
import { Routes } from "./Routes";
import { LoadingOverlay } from "../ui/LoadingOverlay";

export const NoAuthOnlyRoute = observer(({ component: Component, ...props }: any) => {
    if (!authStore.isRehydrated) {
        return <LoadingOverlay />;
    }

    return (
        <Route
            {...props}
            render={(props) =>
                !authStore.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: Routes.DASHBOARD.ROOT,
                                state: { from: props.location },
                            }}
                        />
                    )
            }
        />
    );
});
