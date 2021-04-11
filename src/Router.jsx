import React from 'react';
import { Redirect, Route, Switch } from 'wouter';

import { CommonLayout } from '~/components/common/Layout';
import * as ROUTES from '~/constants/Routes';
import {
    Login,
    PhoneBook,
    PhoneBookEntryCreation,
    SerialNumberValidation,
    Users,
} from '~/containers';

const RestrictedRoute = ({
    isAuthenticated,
    children,
    redirectTo = ROUTES.LOGIN,
    wrapper: Wrapper = CommonLayout,
    ...rest
}) =>
    isAuthenticated ? (
        <Route {...rest}>
            <Wrapper>{children}</Wrapper>
        </Route>
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

export const Router = ({ isAuthenticated, isAdmin, isManager }) => (
    <Switch>
        <RestrictedRoute
            isAuthenticated={!isAuthenticated}
            path={ROUTES.LOGIN}
            redirectTo={ROUTES.PHONEBOOK}
            wrapper={React.Fragment}
        >
            <Login />
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
        {(isAdmin || isManager) && (
            <RestrictedRoute
                isAuthenticated={isAuthenticated}
                path={ROUTES.PHONEBOOK_CREATE}
            >
                <PhoneBookEntryCreation />
            </RestrictedRoute>
        )}
        {isAdmin && (
            <RestrictedRoute
                isAuthenticated={isAuthenticated}
                path={ROUTES.USERS_CREATE}
            >
                {/* //TODO: <UsersCreation /> */}
            </RestrictedRoute>
        )}
        <Redirect
            from="*"
            to={isAuthenticated ? ROUTES.LOGIN : ROUTES.PHONEBOOK}
        />
    </Switch>
);
