import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import MainHeader from '../MainHeader/MainHeader';
import MainSider from '../MainSider/MainSider';

import './MainMenu.scss';

const MainMenu = () => {
    return (
        <Layout style={{ height: '100vh', width: '100%' }}>
            <MainHeader />
            <Layout>
                <MainSider />
                <Layout
                    className="content-layout"
                    style={{
                        height: 'calc(100vh-75px)',
                        padding: 22,
                    }}
                >
                    <Outlet />
                </Layout>
            </Layout>
        </Layout>
    );
};
export default MainMenu;
