import { Store } from 'pullstate';

import { isAuthTokenPresent, isRefreshTokenPresent } from '~/helpers/auth';

export const AppStore = new Store({
    isAuthenticated: isAuthTokenPresent(),
    isActivated: isRefreshTokenPresent(),
    user: {},
});
