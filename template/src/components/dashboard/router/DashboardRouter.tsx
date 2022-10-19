import { Route } from "react-router-dom";
import { CustomSwitch } from "../../app/router/CustomSwitch";
import { DashboardSite } from "../sites/DashboardSite";
import { DashboardRoutes } from "./DashboardRoutes";

export const DashboardRouter = () => (
    <CustomSwitch>
        <Route exact path={DashboardRoutes.ROOT}>
            <DashboardSite />
        </Route>
    </CustomSwitch>
);
