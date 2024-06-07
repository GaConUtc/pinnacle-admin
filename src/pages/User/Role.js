import React, { useCallback, useEffect, useState } from 'react';
import { Layout, Table, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { getRoles, getRole } from '../../services/apis/RoleApis';
import ModalCreateUpdateRole from './components/ModalCreateUpdateRole';
import MainContentHeader from '../../components/MainContentHeader/MainContentHeader';

const { Content } = Layout;
const showHeader = {
    search: false,
    filter: false,
    addNew: true,
};
function Role() {
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState();
    const [isOpenModal, setIsModalOpen] = useState(false);
    const [isReload, setIsReload] = useState(false);

    const editRole = async (role) => {
        try {
            const res = await getRole({ id: role.id });
            setRole(res.data);
            setIsModalOpen(true);
        } catch (error) {
            message.error(error.message);
        }
    };

    const fetchRoles = useCallback(async () => {
        try {
            const response = await getRoles();
            setRoles(response.data);
        } catch (error) {
            message.error(error.message);
        }
    }, []);

    useEffect(() => {
        fetchRoles();
    }, [isReload, fetchRoles]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sortTitle: 'Name',
            sorter: true,
            width: '20%',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: true,
            sortTitle: 'Description',
        },
        {
            title: '',
            dataIndex: '',
            align: 'center',
            render: (data) => {
                return (
                    <>
                        <EditOutlined style={{ marginRight: 10, cursor: 'pointer' }} onClick={() => editRole(data)} />
                    </>
                );
            },
        },
    ];
    console.log(isReload);
    return (
        <>
            <Content>
                <MainContentHeader
                    titleLeft="Role"
                    showHeader={showHeader}
                    isOpenModal={isOpenModal}
                    setIsModalOpen={setIsModalOpen}
                    isReload={isReload}
                    setIsReload={setIsReload}
                />
                <div className="content-table" style={{ backgroundColor: '#fff' }}>
                    <Table
                        width={'100%'}
                        columns={columns}
                        showSorterTooltip={false}
                        dataSource={roles}
                        pagination={false}
                        loading={false}
                        rowKey={(record) => record?.id}
                    />
                </div>
                {isOpenModal && (
                    <ModalCreateUpdateRole
                        role={role}
                        setRole={setRole}
                        isOpenModal={isOpenModal}
                        setIsOpenModal={setIsModalOpen}
                        isReload={isReload}
                        setIsReload={setIsReload}
                    />
                )}
            </Content>
        </>
    );
}

export default Role;
