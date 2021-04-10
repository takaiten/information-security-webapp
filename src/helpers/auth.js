import { createAsyncAction, errorResult, successResult } from 'pullstate';

import { REFRESH_TOKEN_KEY, AUTH_TOKEN_KEY } from '~/constants/auth';

import { AppStore } from '~/services/store';
import API from '~/services/api';

export const isRefreshTokenPresent = () =>
    Boolean(localStorage.getItem(REFRESH_TOKEN_KEY));

export const isAuthTokenPresent = () =>
    Boolean(localStorage.getItem(AUTH_TOKEN_KEY));

export const authenticateUser = createAsyncAction(
    async ({ email, password }) => {
        const result = await API.post(
            'login',
            { email, password },
            { arguments: { tokenKey: REFRESH_TOKEN_KEY } },
        );

        if (result.success) {
            const { access_token: token, user } = result.data;

            localStorage.setItem(AUTH_TOKEN_KEY, token);
            AppStore.update((s) => {
                s.isAuthenticated = true;
                s.user = user;
            });

            return successResult(result);
        }

        return errorResult([], 'Bruh...');
    },
);
