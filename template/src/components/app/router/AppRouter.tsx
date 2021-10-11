import { observer } from "mobx-react";
import * as React from "react";
import { Router } from "react-router-dom";
import { generalStore } from "../../../stores/GeneralStore";
import { DashboardRoutes } from "../../dashboard/router/DashboardRoutes";
import { DashboardContainerSite } from "../../dashboard/sites/DashboardContainerSite";
import { LoadingOverlay } from "../../ui/LoadingOverlay";
import { AuthLoginSite } from "../../auth/sites/AuthLoginSite";
import { CustomSwitch } from "./CustomSwitch";
import { history } from "./history";
import { NoAuthOnlyRoute } from "./NoAuthOnlyRoute";
import { PrivateRoute } from "./PrivateRoute";
import { Routes } from "./Routes";
import { RoutingManager } from "./RoutingManager";

export const AppRouter = observer(() => (
    <>
        <Router history={history}>
            <RoutingManager>
                <CustomSwitch>
                    <NoAuthOnlyRoute exact path={Routes.ROOT}>
                        <AuthLoginSite />
                    </NoAuthOnlyRoute>
                    <PrivateRoute exact path={DashboardRoutes.ROOT}>
                        <DashboardContainerSite />
                    </PrivateRoute>
                </CustomSwitch>
            </RoutingManager>
        </Router>
        {generalStore.isLoading && <LoadingOverlay />}
    </>
));
