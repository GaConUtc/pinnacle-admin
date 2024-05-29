import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import SiderItems from './SiderItems';

function MainSider() {
    const location = useLocation();
    const { Sider } = Layout;

    const siderItems = SiderItems.map((item) => {
        return {
            key: item.key,
            label: <Link to={item.linkTo}>{item.text}</Link>,
        };
    });

    const path = location?.pathname;
    const siderItem = SiderItems?.find((s) => path.includes(s.linkTo));
    const selectedKey = siderItem ? siderItem.key : SiderItems?.find((s) => s?.selectedDefault === true)?.key;

    return (
        <Sider width={250} style={{}}>
            <Menu
                mode="inline"
                selectedKeys={selectedKey}
                style={{
                    height: '100%',
                    borderRight: 0,
                    padding: '0px 25px',
                }}
                items={siderItems}
            />
        </Sider>
    );
}

export default MainSider;
