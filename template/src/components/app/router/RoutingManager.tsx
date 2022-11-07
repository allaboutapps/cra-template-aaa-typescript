import * as React from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export const RoutingManager = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const action = useNavigationType();

    React.useEffect(() => {
        console.log(
            `%cSwitching url to "${location.pathname}${location.search}${location.hash}" by action ${action}.`,
            "background: #eee; color: #666;",
        );
    }, [action, location.search, location.hash, location.pathname]);

    return <>{children}</>;
};
