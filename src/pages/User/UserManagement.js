import React from 'react';
import { Tabs, Layout } from 'antd';
import User from './User';
import Role from './Role';
import Permission from './Permission';

import './UserManagement.scss';

const { Content } = Layout;
function UserManagement() {
    const items = [
        {
            key: 'User',
            label: 'User',
            children: <User />,
        },
        {
            key: 'Permission',
            label: 'Permission',
            children: <Permission />,
        },
        {
            key: 'Role',
            label: 'Role',
            children: <Role />,
        },
    ];

    return (
        <Content>
            <Tabs
                className="user-management-menu"
                destroyInactiveTabPane={true}
                defaultActiveKey="User"
                items={items}
            />
        </Content>
    );
}

export default UserManagement;
