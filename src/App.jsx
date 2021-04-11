import React, { useEffect } from 'react';

import { getCurrentUser } from '~/helpers/users';
import { AppStore } from '~/services/store';

import { ActivationRouter, Router } from './Routes';

export const App = () => {
    const isActivated = AppStore.useState((s) => s.isActivated);
    const isAuthenticated = AppStore.useState((s) => s.isAuthenticated);

    useEffect(() => {
        getCurrentUser.run();
    }, []);

    return isActivated ? (
        <Router isAuthenticated={isAuthenticated} />
    ) : (
        <ActivationRouter />
    );
};
