import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { BASE_NAME, DEBUG_PUBLIC_DASHBOARD, LOADING_INDICATOR_DELAY_MS } from "../../../config";
import { useDebugStore } from "../../../stores/debugStore";
import { useGeneralStore } from "../../../stores/generalStore";
import { AuthLoginSite } from "../../auth/sites/AuthLoginSite";
import { DashboardRoutes } from "../../dashboard/router/DashboardRoutes";
import { DashboardSite } from "../../dashboard/sites/DashboardSite";
import Debug from "../../debug/Debug";
import { DebugButton } from "../../debug/DebugButton";
import { NotFoundSite } from "../../shared/sites/NotFoundSite";
import { ErrorToast } from "../../ui/ErrorToast";
import { LoadingOverlay } from "../../ui/LoadingOverlay";
import { BaseRoutes } from "./BaseRoutes";
import { NoAuthOnlyRoute } from "./NoAuthOnlyRoute";
import { PrivateRoute } from "./PrivateRoute";
import { RoutingManager } from "./RoutingManager";
import ScrollToTop from "./ScrollToTop";

export const AppRouter = () => {
    const isLoading = useGeneralStore((state) => state.isLoading);
    const debugEnabled = useDebugStore((state) => state.enabled);
    const debugDialogOpen = useDebugStore((state) => state.dialogOpen);
    const reactQueryDevtoolsEnabled = useDebugStore((state) => state.reactQueryDevtoolsEnabled);

    return (
        <>
            <BrowserRouter basename={BASE_NAME || "/"}>
                <ScrollToTop />
                <RoutingManager>
                    <Routes>
                        <Route element={<NoAuthOnlyRoute />}>
                            <Route path={BaseRoutes.ROOT} element={<AuthLoginSite />} />
                        </Route>
                        <Route element={DEBUG_PUBLIC_DASHBOARD ? <Outlet /> : <PrivateRoute />}>
                            <Route path={DashboardRoutes.ROOT} element={<DashboardSite />} />
                        </Route>
                        <Route path={BaseRoutes.DEBUG} element={<Debug />} />
                        <Route path="*" element={<NotFoundSite />} />
                    </Routes>
                </RoutingManager>
                {debugEnabled && (
                    <>
                        {debugDialogOpen && <Debug />}
                        <DebugButton />
                        {reactQueryDevtoolsEnabled && <ReactQueryDevtools initialIsOpen={false} />}
                    </>
                )}
            </BrowserRouter>
            {isLoading && <LoadingOverlay delayMs={LOADING_INDICATOR_DELAY_MS} />}
            <ErrorToast />
        </>
    );
};
