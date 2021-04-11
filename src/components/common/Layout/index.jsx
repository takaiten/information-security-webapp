import { GroupOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, Typography } from 'antd';
import React, { useCallback } from 'react';
import { Link, useLocation } from 'wouter';

import { AUTH_TOKEN_KEY } from '~/constants';
import * as ROUTES from '~/constants/Routes';
import { AppStore } from '~/services/store';

const MENU_OPTIONS = [
    { location: ROUTES.HOME, label: 'Home', icon: <HomeOutlined /> },
    { location: ROUTES.USERS, label: 'Users', icon: <UserOutlined /> },
    { location: ROUTES.PHONEBOOK, label: 'PhoneBook', icon: <GroupOutlined /> },
];

const { Header, Content, Footer } = Layout;

export const CommonLayout = ({ children, menuOptions = MENU_OPTIONS }) => {
    const [current, setLocation] = useLocation();
    const user = AppStore.useState((s) => s.user);

    const handleLogout = useCallback(() => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        AppStore.update((s) => {
            s.user = {};
            s.isAuthenticated = false;
        });
        setLocation(ROUTES.LOGIN);
    });

    return (
        <Layout style={{ height: '100vh' }}>
            <Header>
                <Menu theme="dark" mode="horizontal" selectedKeys={[current]}>
                    {menuOptions.map(({ location, label, icon }) => (
                        <Menu.Item key={location} icon={icon}>
                            <Link to={location}>{label}</Link>
                        </Menu.Item>
                    ))}
                    <div style={{ float: 'right', width: '250px' }}>
                        <Typography.Text
                            keyboard
                            type="success"
                            style={{ padding: '0 10px' }}
                        >
                            {user.email}
                        </Typography.Text>
                        <Button type="primary" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </Menu>
            </Header>
            <Content style={{ padding: '25px 50px', height: '100%' }}>
                <div style={{ background: '#FFF', height: '100%' }}>
                    {children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Bruh Moment ©2021 Created by Epic Gamers
            </Footer>
        </Layout>
    );
};
