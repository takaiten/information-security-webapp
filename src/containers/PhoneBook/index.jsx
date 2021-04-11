import { Button, Card, List } from 'antd';
import React, { useCallback } from 'react';

import {
    deletePhoneBookEntry,
    getAllPhoneBookEntries,
} from '~/helpers/phoneBook';
import { isUserAdmin, isUserManager } from '~/helpers/users';
import { AppStore } from '~/services/store';

export const PhoneBook = () => {
    const canDeleteEntry = AppStore.useState(
        (s) => isUserAdmin(s.user) || isUserManager(s.user),
    );
    const [, result] = getAllPhoneBookEntries.useBeckon();

    const handlePhoneBookEntryDelete = useCallback(({ currentTarget }) => {
        const { entryId } = currentTarget.dataset;
        entryId && deletePhoneBookEntry.run({ entryId });
    }, []);

    return (
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
            }}
            itemLayout="horizontal"
            dataSource={result.payload || []}
            renderItem={({ name, telephone, address, id }) => (
                <List.Item key={id}>
                    <Card
                        title={name}
                        extra={
                            canDeleteEntry && (
                                <Button
                                    data-entry-id={id}
                                    type="danger"
                                    onClick={handlePhoneBookEntryDelete}
                                >
                                    Delete
                                </Button>
                            )
                        }
                    >
                        <Card.Meta title={telephone} description={address} />
                    </Card>
                </List.Item>
            )}
        />
    );
};
