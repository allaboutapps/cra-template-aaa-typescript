import { observer } from "mobx-react";
import * as React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { authStore } from "../../../stores/AuthStore";
import { LoadingOverlay } from "../../ui/LoadingOverlay";
import { Routes } from "./Routes";

export const PrivateRoute = observer(({ children, ...props }: React.ComponentProps<typeof Route>) => {
    const location = useLocation();

    if (!authStore.isRehydrated) {
        return <LoadingOverlay />;
    }

    return (
        <Route {...props}>
            {authStore.isAuthenticated ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: Routes.ROOT,
                        state: { from: location },
                    }}
                />
            )}
        </Route>
    );
});
