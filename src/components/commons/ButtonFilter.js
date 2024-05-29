import React from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Button } from 'antd';
function ButtonFilter() {
    return <Button icon={<FilterOutlined style={{ fontSize: 16, opacity: 0.5 }} />}>Filter</Button>;
}

export default ButtonFilter;
