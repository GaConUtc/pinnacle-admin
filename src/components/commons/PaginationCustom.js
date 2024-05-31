import React from 'react';
import { Pagination } from 'antd';

function PaginationCustom({ total, page, pageSize, onChange, onShowSizeChange }) {
    return (
        <Pagination
            style={{
                background: '#fff',
            }}
            current={page}
            pageSize={pageSize}
            total={total}
            showSizeChanger
            pageSizeOptions={['10', '20', '50']}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
            showTotal={() =>
                `Showing data ${(page - 1) * pageSize + 1} to ${
                    page * pageSize > total ? total : page * pageSize
                } of ${total} entries`
            }
        />
    );
}

export default PaginationCustom;
