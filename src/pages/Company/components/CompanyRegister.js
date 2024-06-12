import React, { useEffect, useState } from 'react';
import { Table, Card, message } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

import MainContentHeader from '../../../components/MainContentHeader/MainContentHeader';
import { getCompanies } from '../../../services/apis/CompanyApis';

const showHeader = {
    search: true,
    filter: true,
    addNew: true,
};

function CompanyRegister({ changeMode }) {
    const [companies, setCompanies] = useState([]);
    const editCompany = (company) => {
        changeMode(true);
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sortTitle: 'Name',
            sorter: true,
            width: '20%',
        },
        {
            title: 'ABN',
            dataIndex: 'companyABN',
            sortTitle: 'CompanyABN',
            sorter: true,
        },
        {
            title: 'URL',
            dataIndex: 'companyURL',
            sortTitle: 'CompanyURL',
            sorter: true,
        },
        {
            title: 'Contact 1 Name',
            dataIndex: 'contactName1',
            sortTitle: 'ContactName1',
            sorter: true,
        },
        {
            title: 'Contact 1 Phone',
            dataIndex: 'contactNumber1',
            sortTitle: 'ContactNumber1',
            sorter: true,
        },
        {
            title: 'Contact 1 Email',
            dataIndex: 'contactEmail1',
            sortTitle: 'ContactEmail1',
            sorter: true,
        },
        {
            title: 'Status',
            dataIndex: 'statusStr',
            sorter: true,
            sortTitle: 'StatusStr',
        },
        {
            title: '',
            dataIndex: '',
            align: 'center',
            width: '7%',
            render: (data) => {
                return (
                    <>
                        <ArrowRightOutlined
                            style={{ marginRight: 10, cursor: 'pointer' }}
                            onClick={() => editCompany(data)}
                        />
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await getCompanies();
                setCompanies(response.data);
            } catch (error) {
                message.error(error?.message);
            }
        };
        fetchCompanies();
    }, []);
    return (
        <Card
            title={
                <MainContentHeader
                    titleLeft="Company"
                    showHeader={showHeader}
                    // isOpenModal={isOpenModal}
                    // setIsModalOpen={setIsModalOpen}
                    // isReload={isReload}
                    // setIsReload={setIsReload}
                />
            }
        >
            <div className="content-table" style={{ backgroundColor: '#fff' }}>
                <Table
                    columns={columns}
                    showSorterTooltip={false}
                    dataSource={companies}
                    pagination={false}
                    loading={false}
                    scroll={{ y: 495 }}
                    rowKey={(record) => record?.id}
                />
            </div>
        </Card>
    );
}

export default CompanyRegister;
