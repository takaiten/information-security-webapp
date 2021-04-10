import { createAsyncAction, errorResult, successResult } from 'pullstate';

import { AppStore } from '~/services/store';
import API from '~/services/api';

// import { REFRESH_TOKEN_KEY } from '~/constants/auth';

export const validateSerialNumber = createAsyncAction(
    async ({ serialNumber, setLocation }) => {
        const result = await API.get(
            `serial_number/?serial_number=${serialNumber}`,
        );

        console.log(result);

        if (result.success) {
            // localStorage.setItem(REFRESH_TOKEN_KEY, result.data);
            AppStore.update((s) => {
                s.isActivated = true;
            });
            return successResult(result);
        }

        return errorResult([], "Couldn't validate serial number");
    },
);
