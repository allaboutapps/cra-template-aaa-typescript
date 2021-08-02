import * as React from "react";
import { history } from "./history";

export const RoutingManager = ({ children }: { children: React.ReactNode }) => {
    const [lastLocation, setLastLocation] = React.useState(history.location);

    React.useEffect(() => {
        history.listen((location: any, action: any) => {
            if (location !== lastLocation) {
                console.log(
                    `%cSwitching url to "${location.pathname}${location.search}${location.hash}" by action ${action}.`,
                    "background: #eee; color: #666;",
                );
                setLastLocation(location);
            }
        });
    }, [lastLocation]);
    return <>{children}</>;
};
