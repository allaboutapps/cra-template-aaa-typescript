import * as React from "react";
import { history } from "./history";

export const RoutingManager = ({ children }: { children: React.ReactNode }) => {
    React.useEffect(() => {
        history.listen((location, action) => {
            console.log(
                `%cSwitching url to "${location.pathname}${location.search}${location.hash}" by action ${action}.`,
                "background: #eee; color: #666;",
            );
        });
    }, []);

    return <>{children}</>;
};
