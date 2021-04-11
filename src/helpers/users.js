import { createAsyncAction, errorResult, successResult } from 'pullstate';

import API from '~/services/api';
import { AppStore } from '~/services/store';

export const isUserAdmin = (user) => user.role_id === 1;
export const isUserManager = (user) => user.role_id === 2;
export const isRegularUser = (user) => user.role_id === 3;

export const getCurrentUser = createAsyncAction(async () => {
    const result = await API.get(`users/me`);

    if (result.success) {
        AppStore.update((s) => {
            s.user = result.data;
        });
        return successResult(result.data);
    }

    return errorResult([], "Couldn't retrieve current user");
});

export const getAllUsers = createAsyncAction(
    async () => {
        const result = await API.get('users/');

        if (result.success) {
            return successResult(result.data);
        }

        return errorResult([], "Couldn't retrieve users");
    },
    {
        postActionHook: ({ result }) => {
            if (!result.error) {
                AppStore.update((s) => {
                    s.users = result.payload;
                });
            }
        },
    },
);

export const deleteUserById = createAsyncAction(async ({ userId }) => {
    const result = await API.delete(`users/${userId}`);

    if (result.success) {
        getAllUsers.run(undefined);
        return successResult(result.data);
    }

    return errorResult([], `Couldn't delete user ${userId}`);
});
