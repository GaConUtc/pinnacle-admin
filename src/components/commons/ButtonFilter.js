import React, { useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Button, Popover, Tree, Badge } from 'antd';

function ButtonFilter({ checkedKeys, setCheckedKeys, treeData }) {
    const onCheck = (checkedKeysValue) => {
        setCheckedKeys(checkedKeysValue);
    };
    const countBadge = checkedKeys?.length;
    const [open, setOpen] = useState(false);
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const treeComponent = (
        <Tree
            defaultCheckedKeys={checkedKeys}
            onCheck={onCheck}
            className="tree-no-children"
            checkable
            treeData={treeData}
        />
    );
    return (
        <Badge size="default" style={{ background: '#002060' }} count={countBadge}>
            <Popover
                className="filter-no-node"
                content={treeComponent}
                title="Filter"
                trigger={'click'}
                open={open}
                placement="bottom"
                onOpenChange={handleOpenChange}
            >
                <Button icon={<FilterOutlined style={{ fontSize: 16, opacity: 0.5 }} />}>Filter</Button>
            </Popover>
        </Badge>
    );
}

export default ButtonFilter;
