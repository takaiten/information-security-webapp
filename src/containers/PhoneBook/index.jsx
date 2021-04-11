import { Button, Card, List, Spin } from 'antd';
import React from 'react';

import { getAllPhoneBookEntries } from '~/helpers/phoneBook';
import { isUserAdmin, isUserManager } from '~/helpers/users';
import { AppStore } from '~/services/store';

export const PhoneBook = () => {
    const canDeleteEntry = AppStore.useState(
        (s) => isUserAdmin(s.user) || isUserManager(s.user),
    );
    const [finished, result] = getAllPhoneBookEntries.useBeckon();

    return (
        <Spin spinning={!finished}>
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
                                    <Button data-user-id={id} type="danger">
                                        Delete
                                    </Button>
                                )
                            }
                        >
                            <Card.Meta
                                title={telephone}
                                description={address}
                            />
                        </Card>
                    </List.Item>
                )}
            />
        </Spin>
    );
};
