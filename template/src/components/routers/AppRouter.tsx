import { observer } from "mobx-react";
import * as React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { generalStore } from "../../stores/GeneralStore";
import { LoginSite } from "../sites/LoginSite";
import { NotFoundSite } from "../sites/NotFoundSite";
import { LoadingOverlay } from "../ui/LoadingOverlay";
import { DashboardRouter } from "./DashboardRouter";
import { history } from "./history";
import { NoAuthOnlyRoute } from "./NoAuthOnlyRoute";
import { PrivateRoute } from "./PrivateRoute";
import { Routes } from "./Routes";
import { RoutingManager } from "./RoutingManager";

export const AppRouter = observer(() => (
    <>
        <Router history={history}>
            <RoutingManager>
                <Switch>
                    <NoAuthOnlyRoute exact path={Routes.ROOT} component={LoginSite} />
                    <PrivateRoute exact path={Routes.DASHBOARD.ROOT} component={DashboardRouter} />
                    <Route component={NotFoundSite} />
                </Switch>
            </RoutingManager>
        </Router>
        {generalStore.isLoading && <LoadingOverlay />}
    </>
));
