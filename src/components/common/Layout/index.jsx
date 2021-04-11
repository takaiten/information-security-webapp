import { GroupOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, Typography } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import React, { useCallback } from 'react';
import { Link, useLocation } from 'wouter';

import { AUTH_TOKEN_KEY } from '~/constants';
import * as ROUTES from '~/constants/Routes';
import { AppStore } from '~/services/store';

const MENU_OPTIONS = [
    {
        location: ROUTES.HOME,
        label: 'Home',
        icon: <HomeOutlined />,
        access: [1, 2, 3],
    },
    {
        location: ROUTES.USERS,
        label: 'Users',
        icon: <UserOutlined />,
        access: [1, 2],
    },
    {
        location: ROUTES.PHONEBOOK,
        label: 'PhoneBook',
        icon: <GroupOutlined />,
        access: [1, 2, 3],
    },
];

const { Header, Content } = Layout;

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
        <Layout style={{ minHeight: '100vh' }}>
            <Header>
                <Menu theme="dark" mode="horizontal" selectedKeys={[current]}>
                    {menuOptions.map(
                        ({ location, label, icon, access }) =>
                            access?.includes(user.role_id) && (
                                <Menu.Item key={location} icon={icon}>
                                    <Link to={location}>{label}</Link>
                                </Menu.Item>
                            ),
                    )}
                    <div style={{ float: 'right' }}>
                        <Typography.Text
                            keyboard
                            type="success"
                            style={{ padding: '0 16px' }}
                        >
                            {user.email}
                        </Typography.Text>
                        <Button type="primary" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </Menu>
            </Header>
            <Layout hasSider>
                <Sider width={200}>
                    <Menu
                        mode="inline"
                        selectedKeys={[current]}
                        defaultOpenKeys={['sub-1', 'sub-2']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.SubMenu key="sub-1" title="Phonebook">
                            <Menu.ItemGroup>
                                <Menu.Item key={ROUTES.PHONEBOOK}>
                                    <Link to={ROUTES.PHONEBOOK}>List</Link>
                                </Menu.Item>
                                <Menu.Item key={ROUTES.PHONEBOOK_CREATE}>
                                    <Link to={ROUTES.PHONEBOOK_CREATE}>
                                        Create
                                    </Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="sub-2" title="Users">
                            <Menu.ItemGroup>
                                <Menu.Item key={ROUTES.USERS}>
                                    <Link to={ROUTES.USERS}>List</Link>
                                </Menu.Item>
                                <Menu.Item key={ROUTES.USERS_CREATE}>
                                    <Link to={ROUTES.USERS_CREATE}>Create</Link>
                                </Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ padding: '24px' }}>
                        <div
                            style={{
                                padding: 24,
                                background: '#FFF',
                                height: '100%',
                                overflowY: 'auto',
                            }}
                        >
                            {children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );

    // return (
    //     <Layout style={{ minHeight: '100vh' }}>
    //         <Sider>
    //             <Menu theme="dark" selectedKeys={[current]} mode="inline">
    //                 <Menu.SubMenu title="Phonebook">
    //                     <Menu.ItemGroup>
    //                         <Menu.Item key={ROUTES.PHONEBOOK}>
    //                             <Link to={ROUTES.PHONEBOOK}>List</Link>
    //                         </Menu.Item>
    //                         <Menu.Item key={ROUTES.PHONEBOOK_CREATE}>
    //                             <Link to={ROUTES.PHONEBOOK_CREATE}>Create</Link>
    //                         </Menu.Item>
    //                     </Menu.ItemGroup>
    //                 </Menu.SubMenu>
    //                 {/* {menuOptions.map(
    //                     ({ location, label, icon, access }) =>
    //                         access?.includes(user.role_id) && (
    //                             <Menu.Item key={location} icon={icon}>
    //                                 <Link to={location}>{label}</Link>
    //                             </Menu.Item>
    //                         ),
    //                 )} */}
    //             </Menu>
    //         </Sider>
    //         <Layout>
    //             <Header>
    //                 <div style={{ float: 'right' }}>
    //                     <Typography.Text
    //                         keyboard
    //                         type="success"
    //                         style={{ padding: '0 16px' }}
    //                     >
    //                         {user.email}
    //                     </Typography.Text>
    //                     <Button type="primary" onClick={handleLogout}>
    //                         Logout
    //                     </Button>
    //                 </div>
    //             </Header>
    //             <Content style={{ padding: '25px 50px', height: '100%' }}>
    //                 <div
    //                     style={{
    //                         padding: '25px',
    //                         background: '#FFF',
    //                         height: '100%',
    //                         overflowY: 'auto',
    //                     }}
    //                 >
    //                     {children}
    //                 </div>
    //             </Content>
    //             <Footer style={{ textAlign: 'center' }}>
    //                 Bruh Moment ©2021 Created by Epic Gamers
    //             </Footer>
    //         </Layout>
    //     </Layout>
    // );
};
