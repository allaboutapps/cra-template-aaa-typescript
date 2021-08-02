import { Routes } from "../../app/router/Routes";

const prefix = (route: string) => Routes.DASHBOARD + route;

export const DashboardRoutes = {
    ROOT: prefix("/"),
};
