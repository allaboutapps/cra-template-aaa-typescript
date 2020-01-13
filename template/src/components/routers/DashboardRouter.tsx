import { observer } from "mobx-react";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { NotFoundSite } from "../sites/NotFoundSite";
import { Routes } from "./Routes";
import { DashboardSite } from "../sites/dashboard/DashboardSite";

export const DashboardRouter = observer(() => (
    <Switch>
        <Route exact path={Routes.DASHBOARD.ROOT} component={DashboardSite} />
        <Route component={NotFoundSite} />
    </Switch>
));
