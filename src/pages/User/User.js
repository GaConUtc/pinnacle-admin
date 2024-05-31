import React, { useEffect, useState, useCallback } from 'react';
import { Layout, Table } from 'antd';

import useDebounce from '../../components/commons/useDebounce';
import PaginationCustom from '../../components/commons/PaginationCustom';
import MainContentHeader from '../../components/MainContentHeader/MainContentHeader';
import CreateUpdateUserModal from './components/CreateUpdateUserModal';

import { getUsers } from '../../services/apis/UserApis';
import { COMMON_STATUS, SORT_TYPE } from '../../constants/common';

const { Content } = Layout;
function User() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [searchStr, setSearchStr] = useState('');
    const [filterStatus, setFilterStatus] = useState([COMMON_STATUS.ACTIVE.key, COMMON_STATUS.INACTIVE.key]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const filterStatusData = Object.values(COMMON_STATUS)?.map((item) => ({ title: item.value, key: item.key }));
    // const

    const debouncedSearchStr = useDebounce(searchStr, 500);
    const getUserData = useCallback(
        async (...props) => {
            const sortTable =
                (props[2] && [
                    {
                        field: props[2]?.column?.sortTitle,
                        sortType: Object.values(SORT_TYPE)?.find((item) => item.value === props[2]?.order)?.key,
                    },
                ]) ??
                [];

            try {
                const paramInput = {
                    page: page,
                    pageSize: pageSize,
                    search: debouncedSearchStr,
                    status: filterStatus,
                    sort: sortTable,
                };
                const userData = await getUsers(paramInput);
                setUsers(userData?.data?.data?.map((item) => ({ ...item, key: item.id })));
                setPage(userData?.data?.page);
                setPageSize(userData?.data?.pageSize);
                setTotal(userData?.data?.total);
            } catch (error) {
                console.log(error);
            }
        },
        [page, pageSize, debouncedSearchStr, filterStatus],
    );
    useEffect(() => {
        getUserData();
    }, [page, pageSize, debouncedSearchStr, filterStatus, isReload, getUserData]);

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            sortTitle: 'FirstName',
            sorter: true,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            sorter: true,
            sortTitle: 'LastName',
        },
        {
            title: 'Status',
            dataIndex: 'statusStr',
            sorter: true,
            sortTitle: 'StatusStr',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
            width: '25%',
            ellipsis: true,
            sortTitle: 'Email',
        },
        {
            title: 'Contact Number',
            dataIndex: 'phoneNumber',
            sorter: true,
            sortTitle: 'PhoneNumber',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            sorter: true,
            sortTitle: 'Role',
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
        <>
            <Content>
                <MainContentHeader
                    titleLeft="Admin User Management"
                    checkedKeys={filterStatus}
                    setCheckedKeys={setFilterStatus}
                    treeData={filterStatusData}
                    inputValue={searchStr}
                    searchChange={setSearchStr}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
                <div className="content-table" style={{ backgroundColor: '#fff' }}>
                    <Table
                        columns={columns}
                        showSorterTooltip={false}
                        dataSource={users}
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
            <CreateUpdateUserModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                isReload={isReload}
                setIsReload={setIsReload}
            />
        </>
    );
}

export default User;
