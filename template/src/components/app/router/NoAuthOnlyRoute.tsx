import { observer } from "mobx-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authStore } from "../../../stores/AuthStore";
import { DashboardRoutes } from "../../dashboard/router/DashboardRoutes";
import { LoadingOverlay } from "../../ui/LoadingOverlay";

export const NoAuthOnlyRoute = observer(() => {
    const location = useLocation();

    if (!authStore.isRehydrated) {
        return <LoadingOverlay />;
    }

    if (!authStore.isAuthenticated) {
        return <Outlet />;
    } else {
        return <Navigate to={{ pathname: DashboardRoutes.ROOT }} state={{ from: location }} />;
    }
});
