import React, { useEffect, useState } from 'react';
import { Layout, Table, List, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { getRoles } from '../../services/apis/RoleApis';
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
    const [role, setRole] = useState({});
    const [isOpenModal, setIsModalOpen] = useState(false);
    const [isReload, setIsReload] = useState(false);

    const editRole = (role) => {
        setIsModalOpen(true);
        setRole(role);
    };
    useEffect(() => {
        const getRoleData = async () => {
            try {
                const response = await getRoles();
                setRoles(response.data);
            } catch (error) {
                message.error(error.message);
            }
        };
        getRoleData();
    }, [isReload]);

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
                    />
                )}
            </Content>
        </>
    );
}

export default Role;
