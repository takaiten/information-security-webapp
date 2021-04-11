import React, { useEffect } from 'react';

import { getCurrentUser, isUserAdmin, isUserManager } from '~/helpers/users';
import { AppStore } from '~/services/store';

import { ActivationRouter, Router } from './Router';

export const App = () => {
    const hasAdminRights = AppStore.useState(
        (s) => isUserAdmin(s.user) || isUserManager(s.user),
    );
    const isActivated = AppStore.useState((s) => s.isActivated);
    const isAuthenticated = AppStore.useState((s) => s.isAuthenticated);

    useEffect(() => {
        getCurrentUser.run();
    }, []);

    return isActivated ? (
        <Router
            isAuthenticated={isAuthenticated}
            hasAdminRights={hasAdminRights}
        />
    ) : (
        <ActivationRouter />
    );
};
