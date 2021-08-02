import { Route, Switch } from "react-router-dom";
import { NotFoundSite } from "../../shared/NotFoundSite";

export const AuthRouter = () => (
    <Switch>
        <Route component={NotFoundSite} />
    </Switch>
);
