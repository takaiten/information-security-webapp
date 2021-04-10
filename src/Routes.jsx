import React from 'react';
import { Switch, Route, Redirect } from 'wouter';

import * as ROUTES from '~/constants/Routes';
import { SerialNumberValidation } from '~/containers/SerialNumberValidation';
import { Login } from '~/containers/Login';

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

export const ActivationRouter = () => (
    <Switch>
        <Route path={ROUTES.ACTIVATION}>
            <SerialNumberValidation />
        </Route>
        <Redirect from="*" to={ROUTES.ACTIVATION} />
    </Switch>
);

export const Router = ({ isAuthenticated }) => (
    <Switch>
        <RestrictedRoute
            isAuthenticated={!isAuthenticated}
            path={ROUTES.LOGIN}
            redirectTo={ROUTES.APP}
        >
            <Login />
        </RestrictedRoute>
        <RestrictedRoute isAuthenticated={isAuthenticated} path={ROUTES.APP}>
            APP
        </RestrictedRoute>
        <Redirect from="*" to={isAuthenticated ? ROUTES.LOGIN : ROUTES.APP} />
    </Switch>
);
