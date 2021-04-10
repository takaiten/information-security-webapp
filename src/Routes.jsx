import React from 'react';
import { Switch, Route, Redirect } from 'wouter';

import * as ROUTES from '~/constants/Routes';
import {
    Login,
    Home,
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

export const Router = ({ isAuthenticated }) => (
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
        <RestrictedRoute isAuthenticated={isAuthenticated} path={ROUTES.USERS}>
            <Users />
        </RestrictedRoute>
        <RestrictedRoute
            isAuthenticated={isAuthenticated}
            path={ROUTES.PHONEBOOK}
        >
            <PhoneBook />
        </RestrictedRoute>
        <Redirect from="*" to={isAuthenticated ? ROUTES.LOGIN : ROUTES.HOME} />
    </Switch>
);
