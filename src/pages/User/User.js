import React, { useEffect, useState, useCallback } from 'react';
import { Layout, Table } from 'antd';

import useDebounce from '../../components/commons/useDebounce';
import PaginationCustom from '../../components/commons/PaginationCustom';
import MainContentHeader from '../../components/MainContentHeader/MainContentHeader';
import { getUsers } from '../../services/apis/UserApis';

const { Content } = Layout;
function User() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [searchStr, setSearchStr] = useState('');

    const debouncedSearchStr = useDebounce(searchStr, 500);
    const getUserData = useCallback(
        async (...props) => {
            try {
                const paramInput = { page: page, pageSize: pageSize, search: debouncedSearchStr };
                const userData = await getUsers(paramInput);

                setUsers(userData?.data?.data?.map((item) => ({ ...item, key: item.id })));
                setPage(userData?.data?.page);
                setPageSize(userData?.data?.pageSize);
                setTotal(userData?.data?.total);
            } catch (error) {
                console.log(error);
            }
        },
        [page, pageSize, debouncedSearchStr],
    );
    useEffect(() => {
        getUserData();
    }, [page, pageSize, debouncedSearchStr, getUserData]);

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            sorter: true,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            sorter: true,
        },
        {
            title: 'Status',
            dataIndex: 'statusStr',
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
            width: '25%',
            ellipsis: true,
        },
        {
            title: 'Contact Number',
            dataIndex: 'phoneNumber',
            sorter: true,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            sorter: true,
        },
        {
            title: 'Company',
            dataIndex: 'companyAssigned',
            sorter: true,
            render: (items, record, index) => {
                const text = items?.map((item) => item.name)?.join(',');
                return text;
            },
        },
        {
            title: '',
            dataIndex: '',
        },
    ];

    return (
        <Content>
            <MainContentHeader titleLeft="Admin User Management" inputValue={searchStr} searchChange={setSearchStr} />
            <div className="content-table" style={{ backgroundColor: '#fff' }}>
                <Table
                    columns={columns}
                    showSorterTooltip={false}
                    dataSource={users}
                    // scroll={{ y: '100%' }}
                    pagination={false}
                    onChange={getUserData}
                    loading={false}
                />
                <>
                    {total > 0 && (
                        <PaginationCustom
                            total={total}
                            page={page}
                            pageSize={pageSize}
                            onChange={(page, size) => {
                                setPage(page);
                                setPageSize(size);
                            }}
                            onShowSizeChange={(current, pageSize) => setPageSize(pageSize)}
                        />
                    )}
                </>
            </div>
        </Content>
    );
}

export default User;
