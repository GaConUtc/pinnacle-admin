import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import SiderItems from './SiderItems';

function MainSider() {
    const location = useLocation();
    const { Sider } = Layout;
    const [selectedKey, setSelectedKey] = useState('');

    const siderItems = SiderItems.map((item) => {
        return {
            key: item.key,
            label: <Link to={item.linkTo}>{item.text}</Link>,
        };
    });

    useEffect(() => {
        const path = location?.pathname;
        const siderItem = SiderItems?.find((s) => path.includes(s.linkTo));
        setSelectedKey(siderItem ? siderItem.key : SiderItems?.find((s) => s?.selectedDefault === true)?.key);
    }, [location.pathname]);

    return (
        <Sider width={200} style={{}}>
            <Menu
                mode="inline"
                selectedKeys={selectedKey}
                style={{
                    height: '100%',
                    borderRight: 0,
                }}
                items={siderItems}
            />
        </Sider>
    );
}

export default MainSider;
