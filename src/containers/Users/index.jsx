import { Avatar, Button, Card, List, Spin, Tag } from 'antd';
import React, { useCallback } from 'react';

import { ROLES_BY_ID, ROLES_MAP } from '~/constants/users';
import {
    deleteUserById,
    getAllUsers,
    isUserAdmin,
    isUserManager,
} from '~/helpers/users';
import { AppStore } from '~/services/store';

export const Users = () => {
    const [finished, result] = getAllUsers.useBeckon();

    const currentUser = AppStore.useState((s) => s.user);
    const isAdmin = isUserAdmin(currentUser);
    const isManager = isUserManager(currentUser);

    const handleUserDelete = useCallback(({ currentTarget }) => {
        const userId = currentTarget.dataset['userId'];
        userId && deleteUserById.run({ userId });
    }, []);

    const canCurrentUserDelete = useCallback(
        ({ role_id, id }) =>
            // If current user is admin and other is not or
            ((isAdmin && ROLES_BY_ID[role_id] !== ROLES_MAP.ADMIN) ||
                // If current user is manager - he can only delete users
                (isManager && ROLES_BY_ID[role_id] === ROLES_MAP.USER)) &&
            // Cannot delete themself
            currentUser.id !== id,
        [currentUser],
    );

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
                                    <Avatar size={55}>
                                        {name?.slice(0, 2)}
                                    </Avatar>
                                }
                                title={name}
                                description={email}
                            />
                        </Card>
                    </List.Item>
                )}
            />
        </Spin>
    );
};
