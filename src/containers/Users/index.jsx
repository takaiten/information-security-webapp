import { Avatar, Button, Card, List, Tag } from 'antd';
import React, { useCallback } from 'react';

import { ROLES_BY_ID, ROLES_MAP } from '~/constants/users';
import { deleteUserById, getAllUsers, isUserAdmin } from '~/helpers/users';
import { AppStore } from '~/services/store';

export const Users = () => {
    const [, result] = getAllUsers.useBeckon();

    const currentUser = AppStore.useState((s) => s.user);
    const isAdmin = isUserAdmin(currentUser);

    const handleUserDelete = useCallback(({ currentTarget }) => {
        const { userId } = currentTarget.dataset;
        userId && deleteUserById.run({ userId });
    }, []);

    const canCurrentUserDelete = useCallback(
        ({ role_id, id }) =>
            isAdmin &&
            ROLES_BY_ID[role_id] !== ROLES_MAP.ADMIN &&
            currentUser.id !== id,
        [currentUser],
    );

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
            renderItem={({ name, email, role_id, id }) => (
                <List.Item key={id}>
                    <Card
                        title={<Tag>{ROLES_BY_ID[role_id] || role_id}</Tag>}
                        extra={
                            canCurrentUserDelete({ role_id, id }) && (
                                <Button
                                    data-user-id={id}
                                    onClick={handleUserDelete}
                                    type="danger"
                                >
                                    Delete
                                </Button>
                            )
                        }
                    >
                        <Card.Meta
                            avatar={
                                <Avatar size={55}>{name?.slice(0, 2)}</Avatar>
                            }
                            title={name}
                            description={email}
                        />
                    </Card>
                </List.Item>
            )}
        />
    );
};
