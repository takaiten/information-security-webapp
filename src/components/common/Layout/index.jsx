import { GroupOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Link, useLocation } from 'wouter';

import * as ROUTES from '~/constants/Routes';

const MENU_OPTIONS = [
    { location: ROUTES.HOME, label: 'Home', icon: <HomeOutlined /> },
    { location: ROUTES.USERS, label: 'Users', icon: <UserOutlined /> },
    { location: ROUTES.PHONEBOOK, label: 'PhoneBook', icon: <GroupOutlined /> },
];

const { Header, Content, Footer } = Layout;

// TODO:
// 1. Add logout button
// 2. Add user data display
// 3. ???
// 4. Profit
export const CommonLayout = ({ children, menuOptions = MENU_OPTIONS }) => {
    const [current] = useLocation();

    return (
        <Layout style={{ height: '100vh' }}>
            <Header>
                <Menu theme="dark" mode="horizontal" selectedKeys={[current]}>
                    {menuOptions.map(({ location, label, icon }) => (
                        <Menu.Item key={location} icon={icon}>
                            <Link to={location}>{label}</Link>
                        </Menu.Item>
                    ))}
                    <div style={{ float: 'right', width: '100px' }}>USER</div>
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
