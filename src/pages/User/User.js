import React, { useEffect, useState, useCallback } from 'react';
import { Layout, Table, List, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import useDebounce from '../../components/commons/useDebounce';
import PaginationCustom from '../../components/commons/PaginationCustom';
import MainContentHeader from '../../components/MainContentHeader/MainContentHeader';
import CreateUpdateUserModal from './components/CreateUpdateUserModal';

import { getUsers, deleteUser } from '../../services/apis/UserApis';
import { COMMON_STATUS, SORT_TYPE } from '../../constants/common';
import ModalConfirm from '../../components/ModalConfirm/ModalConfirm';

const { Content } = Layout;

const filterStatusData = Object.values(COMMON_STATUS)?.map((item) => ({ title: item.value, key: item.key }));
const showHeader = {
    search: true,
    filter: true,
    addNew: true,
};
function User() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [searchStr, setSearchStr] = useState('');
    const [filterStatus, setFilterStatus] = useState([COMMON_STATUS.ACTIVE.key, COMMON_STATUS.INACTIVE.key]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const [editUser, setEditUser] = useState({
        firstName: '',
        lastName: '',
        contactNumber: '',
        email: '',
        role: null,
        status: COMMON_STATUS.ACTIVE.key,
    });
    const [openDelete, setOpenDelete] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    // const

    const handleEditUser = (user) => {
        setEditUser({ ...user });
        setIsModalOpen(true);
    };
    const handleDeleteUser = (id) => {
        setIdDelete(id);
        setOpenDelete(true);
    };

    const confirmDeleteUser = async () => {
        try {
            const rs = await deleteUser({
                id: idDelete,
            });
            message.success(rs.message);
        } catch (error) {
            message.error(error.message);
        } finally {
            setOpenDelete(false);
            setIsReload(true);
        }
    };

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
            ellipsis: true,
            render: (items, record, index) => {
                return items ? (
                    <List
                        size="small"
                        dataSource={items ?? []}
                        locale={{ emptyText: <span></span> }}
                        renderItem={(item) => (
                            <List.Item
                                key={item?.name}
                                style={{
                                    padding: 0,
                                    borderBlockEnd: 'none',
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <span className="dot-outlined"></span> {item?.name}
                            </List.Item>
                        )}
                    />
                ) : (
                    ''
                );
            },
        },
        {
            title: '',
            dataIndex: '',
            align: 'center',
            render: (data) => {
                return (
                    <>
                        <EditOutlined
                            style={{ marginRight: 10, cursor: 'pointer' }}
                            onClick={() => handleEditUser(data)}
                        />
                        |
                        <DeleteOutlined
                            style={{ marginLeft: 10, cursor: 'pointer' }}
                            onClick={() => handleDeleteUser(data?.id)}
                        />
                    </>
                );
            },
        },
    ];
    const debouncedSearchStr = useDebounce(searchStr, 500);
    const getUserData = useCallback(
        async (_, __, sorter) => {
            const sortTable =
                (sorter && [
                    {
                        field: sorter?.column?.sortTitle,
                        sortType: Object.values(SORT_TYPE)?.find((item) => item.value === sorter?.order)?.key,
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
                message.error(error.message);
            }
        },
        [page, pageSize, debouncedSearchStr, filterStatus],
    );
    useEffect(() => {
        getUserData();
    }, [page, pageSize, debouncedSearchStr, filterStatus, isReload, getUserData]);

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
                    showHeader={showHeader}
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
                                onShowSizeChange={(_, pageSize) => setPageSize(pageSize)}
                            />
                        )}
                    </>
                </div>
            </Content>
            <>
                {isModalOpen && (
                    <CreateUpdateUserModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        isReload={isReload}
                        setIsReload={setIsReload}
                        editUser={editUser}
                        setEditUser={setEditUser}
                    />
                )}
            </>
            <>
                {openDelete && (
                    <ModalConfirm
                        message="Are you sure you want to delete this account?"
                        isOpen={openDelete}
                        setIsOpen={setOpenDelete}
                        onConfirm={confirmDeleteUser}
                    />
                )}
            </>
        </>
    );
}

export default User;
