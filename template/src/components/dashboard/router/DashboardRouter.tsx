import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { DashboardSite } from "../sites/DashboardSite";
import { NotFoundSite } from "../../shared/NotFoundSite";
import { DashboardRoutes } from "./DashboardRoutes";

export const DashboardRouter = () => (
    <Switch>
        <Route exact path={DashboardRoutes.ROOT} component={DashboardSite} />
        <Route component={NotFoundSite} />
    </Switch>
);
