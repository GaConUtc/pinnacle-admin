import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
function InputSearch() {
    return <Input placeholder="Search" prefix={<SearchOutlined style={{ opacity: 0.5 }} />} />;
}

export default InputSearch;
