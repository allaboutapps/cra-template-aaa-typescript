import { observer } from "mobx-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BASE_NAME } from "../../../config";
import { generalStore } from "../../../stores/GeneralStore";
import { AuthLoginSite } from "../../auth/sites/AuthLoginSite";
import { DashboardRoutes } from "../../dashboard/router/DashboardRoutes";
import { DashboardSite } from "../../dashboard/sites/DashboardSite";
import { NotFoundSite } from "../../shared/sites/NotFoundSite";
import { LoadingOverlay } from "../../ui/LoadingOverlay";
import { BaseRoutes } from "./BaseRoutes";
import { NoAuthOnlyRoute } from "./NoAuthOnlyRoute";
import { PrivateRoute } from "./PrivateRoute";
import { RoutingManager } from "./RoutingManager";

export const AppRouter = observer(() => {
    return (
        <>
            <BrowserRouter basename={BASE_NAME || "/"}>
                <RoutingManager>
                    <Routes>
                        <Route element={<NoAuthOnlyRoute />}>
                            <Route path={BaseRoutes.ROOT} element={<AuthLoginSite />} />
                        </Route>
                        <Route element={<PrivateRoute />}>
                            <Route path={DashboardRoutes.ROOT} element={<DashboardSite />} />
                        </Route>
                        <Route path="*" element={<NotFoundSite />} />
                    </Routes>
                </RoutingManager>
            </BrowserRouter>
            {generalStore.isLoading && <LoadingOverlay />}
        </>
    );
});
