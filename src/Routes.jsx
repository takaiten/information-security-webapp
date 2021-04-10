import React from 'react';
import { Switch, Route, Redirect } from 'wouter';

import * as ROUTES from '~/constants/Routes';

const RestrictedRoute = ({
    isAuthenticated,
    children,
    redirectTo = ROUTES.LOGIN,
    ...rest
}) =>
    isAuthenticated ? (
        <Route {...rest}>{children}</Route>
    ) : (
        <Redirect to={redirectTo} />
    );

export const Routes = ({ isAuthenticated }) => (
    <Switch>
        <RestrictedRoute
            isAuthenticated={!isAuthenticated}
            path={ROUTES.LOGIN}
            redirectTo={ROUTES.APP}
        >
            LOGIN
        </RestrictedRoute>
        <RestrictedRoute isAuthenticated={isAuthenticated} path={ROUTES.APP}>
            APP
        </RestrictedRoute>
        <Redirect from="*" to={isAuthenticated ? ROUTES.LOGIN : ROUTES.APP} />
    </Switch>
);
