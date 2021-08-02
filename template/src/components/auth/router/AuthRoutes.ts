import { Routes } from "../../app/router/Routes";

const prefix = (route: string) => Routes.AUTH + route;

export const AuthRoutes = {
    ROOT: prefix("/"),
};
