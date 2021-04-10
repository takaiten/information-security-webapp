import { REFRESH_TOKEN_KEY, AUTH_TOKEN_KEY } from '~/constants/auth';

export const isRefreshTokenPresent = () =>
    Boolean(localStorage.getItem(REFRESH_TOKEN_KEY));

export const isAuthTokenPresent = () =>
    Boolean(localStorage.getItem(AUTH_TOKEN_KEY));
