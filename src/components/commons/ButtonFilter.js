import React, { useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Button, Popover, Tree } from 'antd';

import { COMMON_STATUS } from '../../constants/common';
function ButtonFilter() {
    const [open, setOpen] = useState(false);
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const treeData = Object.values(COMMON_STATUS)?.map((item) => ({ title: item.value, key: item.key }));
    const treeComponent = <Tree checkable treeData={treeData} />;
    return (
        <Popover
            content={treeComponent}
            trigger={'click'}
            open={open}
            placement="bottom"
            onOpenChange={handleOpenChange}
        >
            <Button icon={<FilterOutlined style={{ fontSize: 16, opacity: 0.5 }} />}>Filter</Button>
        </Popover>
    );
}

export default ButtonFilter;
