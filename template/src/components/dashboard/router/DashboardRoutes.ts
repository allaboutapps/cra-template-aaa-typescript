import { BaseRoutes } from "../../app/router/BaseRoutes";

const prefix = (route: string) => BaseRoutes.DASHBOARD + route;

export const DashboardRoutes = {
    ROOT: prefix("/"),
};
