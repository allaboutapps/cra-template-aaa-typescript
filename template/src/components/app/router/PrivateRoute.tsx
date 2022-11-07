import { observer } from "mobx-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authStore } from "../../../stores/AuthStore";
import { LoadingOverlay } from "../../ui/LoadingOverlay";
import { BaseRoutes } from "./BaseRoutes";

export const PrivateRoute = observer(() => {
    const location = useLocation();

    if (!authStore.isRehydrated) {
        return <LoadingOverlay />;
    }

    if (authStore.isAuthenticated) {
        return <Outlet />;
    } else {
        return (
            <Navigate
                to={{
                    pathname: BaseRoutes.ROOT,
                }}
                state={{ from: location }}
            />
        );
    }
});
