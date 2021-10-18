import { observer } from "mobx-react";
import * as React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { authStore } from "../../../stores/AuthStore";
import { DashboardRoutes } from "../../dashboard/router/DashboardRoutes";
import { LoadingOverlay } from "../../ui/LoadingOverlay";

export const NoAuthOnlyRoute = observer(({ children, ...props }: React.ComponentProps<typeof Route>) => {
    const location = useLocation();

    if (!authStore.isRehydrated) {
        return <LoadingOverlay />;
    }

    return (
        <Route {...props}>
            {!authStore.isAuthenticated ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: DashboardRoutes.ROOT,
                        state: { from: location },
                    }}
                />
            )}
        </Route>
    );
});
