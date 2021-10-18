import * as React from "react";
import { Route, Switch } from "react-router";
import { NotFoundSite } from "../../shared/sites/NotFoundSite";

export const CustomSwitch = ({ children }: { children: React.ReactNode }) => (
    <Switch>
        {children}
        <Route>
            <NotFoundSite />
        </Route>
    </Switch>
);
