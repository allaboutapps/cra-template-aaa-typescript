import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";
import { LoadingOverlay } from "../../ui/LoadingOverlay";
import { BaseRoutes } from "./BaseRoutes";

export const PrivateRoute = () => {
    const location = useLocation();

    const isRehydrated = useAuthStore.persist.hasHydrated();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

    if (!isRehydrated) {
        return <LoadingOverlay />;
    }

    if (isAuthenticated) {
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
};
