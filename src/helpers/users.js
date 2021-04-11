import { createAsyncAction, errorResult, successResult } from 'pullstate';

import API from '~/services/api';
import { AppStore } from '~/services/store';

export const getCurrentUser = createAsyncAction(async () => {
    const result = await API.get(`users/me`);

    if (result.success) {
        AppStore.update((s) => {
            s.user = result.data;
        });
        return successResult(result);
    }

    return errorResult([], "Couldn't retrieve current user");
});
