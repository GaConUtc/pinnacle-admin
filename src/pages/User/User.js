import React from 'react';
import { Layout, theme } from 'antd';

const { Content } = Layout;
function User() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Content
            style={{
                padding: 24,
                background: colorBgContainer,
                borderRadius: 24,
            }}
        >
            User
        </Content>
    );
}

export default User;
