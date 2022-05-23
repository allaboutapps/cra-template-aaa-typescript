import * as React from "react";
import { Route, Switch, SwitchProps } from "react-router-dom";
import { NotFoundSite } from "../../shared/sites/NotFoundSite";

export const CustomSwitch = ({ children, ...props }: SwitchProps) => (
    <Switch {...props}>
        {children}
        <Route>
            <NotFoundSite />
        </Route>
    </Switch>
);
