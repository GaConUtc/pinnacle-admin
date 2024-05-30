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
            showTotal={(page, pageSize) => `Showing data ${1} to ${10} of ${18} entries`}
        />
    );
}

export default PaginationCustom;
