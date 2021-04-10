import { isRefreshTokenPresent, isAuthTokenPresent } from '~/helpers/auth';
import { Store } from 'pullstate';

export const AppStore = new Store({
    isAuthenticated: isAuthTokenPresent(),
    isActivated: isRefreshTokenPresent(),
    user: {},
});
