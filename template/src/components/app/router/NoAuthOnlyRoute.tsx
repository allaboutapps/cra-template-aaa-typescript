import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";
import { DashboardRoutes } from "../../dashboard/router/DashboardRoutes";
import { LoadingOverlay } from "../../ui/LoadingOverlay";

export const NoAuthOnlyRoute = () => {
    const location = useLocation();

    const isRehydrated = useAuthStore.persist.hasHydrated();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

    if (!isRehydrated) {
        return <LoadingOverlay />;
    }

    if (!isAuthenticated) {
        return <Outlet />;
    } else {
        return <Navigate to={{ pathname: DashboardRoutes.ROOT }} state={{ from: location }} />;
    }
};
