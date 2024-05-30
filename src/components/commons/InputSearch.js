import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
function InputSearch({ value, searchChange }) {
    const handleChange = (e) => searchChange(e.target.value);
    return (
        <Input
            placeholder="Search"
            value={value}
            onChange={handleChange}
            prefix={<SearchOutlined style={{ opacity: 0.5 }} />}
        />
    );
}

export default InputSearch;
