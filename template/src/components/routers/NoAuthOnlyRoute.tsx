import { observer } from "mobx-react";
import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { authStore } from "../../stores/AuthStore";
import { Routes } from "./Routes";

export const NoAuthOnlyRoute: any = observer(({ component: Component, ...props }: any): any => {
    if (!authStore.isRehydrated) {
        return null;
    }

    return (
        <Route
            {...props}
            render={(props: any): any =>
                !authStore.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: Routes.DASHBOARD.ROOT,
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
});
