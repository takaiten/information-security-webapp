import React from 'react';

import { isRefreshTokenPresent, isAuthTokenPresent } from '~/helpers/auth';

import { Routes } from './Routes';
import { SerialNumberValidation } from '~/containers/SerialNumberValidation';

export const App = () =>
    isRefreshTokenPresent() ? (
        <Routes isAuthenticated={isAuthTokenPresent()} />
    ) : (
        <SerialNumberValidation />
    );
