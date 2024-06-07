import React, { useEffect, useState, useCallback } from 'react';
import { Layout, Table, List, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import MainContentHeader from '../../components/MainContentHeader/MainContentHeader';
import { getPermissions } from '../../services/apis/UserApis';
import ModalUpdatePermission from './components/ModalUpdatePermission';

const { Content } = Layout;
const showHeader = {
    search: false,
    filter: false,
    addNew: false,
};
function Permission() {
    const [permissions, setPermissions] = useState([]);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [permission, setPermission] = useState({});
    const [isReload, setIsReload] = useState(false);

    const handleEditPermission = (data) => {
        setPermission({ ...data });
        setIsOpenEdit(true);
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sortTitle: 'Name',
            sorter: true,
            width: '10%',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            sorter: true,
            sortTitle: 'Description',
        },
        {
            title: 'Linked Modules',
            dataIndex: 'linkedModules',
            sorter: true,
            width: '15%',
            render: (items, record, index) => {
                return (
                    <List
                        size="small"
                        dataSource={items}
                        rowKey={record?.id}
                        renderItem={(item) => (
                            <List.Item
                                key={item}
                                style={{
                                    padding: 0,
                                    borderBlockEnd: 'none',
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <span className="dot-outlined"></span> {item}
                            </List.Item>
                        )}
                    />
                );
            },
        },
        {
            title: 'Status',
            dataIndex: 'statusStr',
            sorter: true,
            sortTitle: 'StatusStr',
            width: '10%',
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
                            onClick={() => handleEditPermission(data)}
                        />
                    </>
                );
            },
        },
    ];

    const getPermissionData = useCallback(async () => {
        try {
            const response = await getPermissions();
            setPermissions(response.data);
        } catch (error) {
            message.error(error.message);
        }
    }, []);

    useEffect(() => {
        getPermissionData();
    }, [isReload, getPermissionData]);

    return (
        <>
            <Content>
                <MainContentHeader titleLeft="Permission" showHeader={showHeader} />
                <div className="content-table" style={{ backgroundColor: '#fff' }}>
                    <Table
                        width={'100%'}
                        columns={columns}
                        showSorterTooltip={false}
                        dataSource={permissions}
                        pagination={false}
                        loading={false}
                        rowKey={(record) => record?.id}
                    />
                </div>
            </Content>
            {isOpenEdit && (
                <ModalUpdatePermission
                    isOpenEdit={isOpenEdit}
                    setIsOpenEdit={setIsOpenEdit}
                    setPermission={setPermission}
                    permission={permission}
                    isReload={isReload}
                    setIsReload={setIsReload}
                />
            )}
        </>
    );
}

export default Permission;
