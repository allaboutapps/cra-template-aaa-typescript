import { Route, Switch } from "react-router-dom";
import { NotFoundSite } from "../../dashboard/sites/NotFoundSite";

export const AuthRouter = () => (
    <Switch>
        <Route component={NotFoundSite} />
    </Switch>
);
