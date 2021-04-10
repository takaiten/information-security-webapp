import { createAsyncAction, errorResult, successResult } from 'pullstate';

import { REFRESH_TOKEN_KEY } from '~/constants/auth';
import API from '~/services/api';
import { AppStore } from '~/services/store';

export const validateSerialNumber = createAsyncAction(
    async ({ serialNumber }) => {
        const result = await API.get(
            `serial_number/?serial_number=${serialNumber}`,
        );

        if (result.success) {
            localStorage.setItem(REFRESH_TOKEN_KEY, result.data);
            AppStore.update((s) => {
                s.isActivated = true;
            });
            return successResult(result);
        }

        return errorResult([], "Couldn't validate serial number");
    },
);
