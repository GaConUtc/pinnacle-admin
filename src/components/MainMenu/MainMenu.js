import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import MainHeader from '../MainHeader/MainHeader';
import MainSider from '../MainSider/MainSider';

import './MainMenu.scss';

const MainMenu = () => {
    return (
        <Layout style={{ height: '100vh' }}>
            <MainHeader />
            <Layout>
                <MainSider />
                <Layout
                    style={{
                        padding: 24,
                    }}
                >
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    );
};
export default MainMenu;
