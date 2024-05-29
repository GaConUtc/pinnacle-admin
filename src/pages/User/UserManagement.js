import React from 'react';
import { Tabs } from 'antd';
import User from './User';
import Role from './Role';
import Permission from './Permission';

import './UserManagement.scss';
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

    return <Tabs className="user-management-menu" defaultActiveKey="User" items={items} />;
}

export default UserManagement;
