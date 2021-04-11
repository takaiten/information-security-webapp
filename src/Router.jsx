import React from 'react';
import { Redirect, Route, Switch } from 'wouter';

import * as ROUTES from '~/constants/Routes';
import {
    Home,
    Login,
    PhoneBook,
    SerialNumberValidation,
    Users,
} from '~/containers';

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
        <Route path={ROUTES.ACTIVATION} component={SerialNumberValidation}>
            <SerialNumberValidation />
        </Route>
        <Redirect from="*" to={ROUTES.ACTIVATION} />
    </Switch>
);

export const Router = ({ isAuthenticated, hasAdminRights }) => (
    <Switch>
        <RestrictedRoute
            isAuthenticated={!isAuthenticated}
            path={ROUTES.LOGIN}
            redirectTo={ROUTES.HOME}
        >
            <Login />
        </RestrictedRoute>
        <RestrictedRoute isAuthenticated={isAuthenticated} path={ROUTES.HOME}>
            <Home />
        </RestrictedRoute>
        {hasAdminRights && (
            <RestrictedRoute
                isAuthenticated={isAuthenticated}
                path={ROUTES.USERS}
            >
                <Users />
            </RestrictedRoute>
        )}
        <RestrictedRoute
            isAuthenticated={isAuthenticated}
            path={ROUTES.PHONEBOOK}
        >
            <PhoneBook />
        </RestrictedRoute>
        <Redirect from="*" to={isAuthenticated ? ROUTES.LOGIN : ROUTES.HOME} />
    </Switch>
);
