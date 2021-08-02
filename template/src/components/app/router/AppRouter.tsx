import { observer } from "mobx-react";
import * as React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { generalStore } from "../../../stores/GeneralStore";
import { LoginSite } from "../../auth/sites/LoginSite";
import { NotFoundSite } from "../../dashboard/sites/NotFoundSite";
import { LoadingOverlay } from "../../ui/LoadingOverlay";
import { DashboardRouter } from "../../dashboard/router/DashboardRouter";
import { NoAuthOnlyRoute } from "./NoAuthOnlyRoute";
import { PrivateRoute } from "./PrivateRoute";
import { RoutingManager } from "./RoutingManager";
import { history } from "./history";
import { DashboardRoutes } from "../../dashboard/router/DashboardRoutes";
import { Routes } from "./Routes";

export const AppRouter = observer(() => (
    <>
        <Router history={history}>
            <RoutingManager>
                <Switch>
                    <NoAuthOnlyRoute exact path={Routes.ROOT} component={LoginSite} />
                    <PrivateRoute exact path={DashboardRoutes.ROOT} component={DashboardRouter} />
                    <Route component={NotFoundSite} />
                </Switch>
            </RoutingManager>
        </Router>
        {generalStore.isLoading && <LoadingOverlay />}
    </>
));
