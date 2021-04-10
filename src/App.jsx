import React from 'react';

import { AppStore } from '~/services/store';

import { Router, ActivationRouter } from './Routes';

export const App = () => {
    const isActivated = AppStore.useState((s) => s.isActivated);
    const isAuthenticated = AppStore.useState((s) => s.isAuthenticated);

    return isActivated ? (
        <Router isAuthenticated={isAuthenticated} />
    ) : (
        <ActivationRouter />
    );
};
