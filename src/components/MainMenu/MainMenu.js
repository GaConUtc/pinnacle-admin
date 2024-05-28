import React from 'react';
import { Layout } from 'antd';

import MainHeader from '../MainHeader/MainHeader';
import MainSider from '../MainSider/MainSider';

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
                ></Layout>
            </Layout>
        </Layout>
    );
};
export default MainMenu;
