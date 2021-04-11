import { createAsyncAction, errorResult, successResult } from 'pullstate';

import API from '~/services/api';
import { AppStore } from '~/services/store';

export const getAllPhoneBookEntries = createAsyncAction(async () => {
    const result = await API.get('phonebook/');

    if (result.success) {
        AppStore.update((s) => {
            s.phonebook = result.data;
        });
        return successResult(result.data);
    }

    return errorResult([], "Couldn't retrieve phonebook");
});

export const createPhoneBookEntry = createAsyncAction(async (values) => {
    const result = await API.post('phonebook/', values);

    if (result.success) {
        getAllPhoneBookEntries.run();
        return successResult();
    }

    return errorResult([], "Couldn't create phonebook entry");
});

export const deletePhoneBookEntry = createAsyncAction(async ({ entryId }) => {
    const result = await API.delete(`phonebook/${entryId}`);

    if (result.success) {
        getAllPhoneBookEntries.run();
        return successResult();
    }

    return errorResult([], "Couldn't create phonebook entry");
});
