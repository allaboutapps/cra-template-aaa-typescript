import * as React from "react";
import { Route, Switch } from "react-router";
import { NotFoundSite } from "../../shared/sites/NotFoundSite";

export const CustomSwitch = ({ children, ...props }: React.ComponentProps<typeof Switch>) => (
    <Switch {...props}>
        {children}
        <Route>
            <NotFoundSite />
        </Route>
    </Switch>
);
