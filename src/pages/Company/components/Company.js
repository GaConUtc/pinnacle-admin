import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, message } from 'antd';

import CompanyDetail from './CompanyDetail';
import { getCompany } from '../../../services/apis/CompanyApis';

function Company() {
    const { companyId } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState();
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await getCompany({ id: companyId });
                setCompany(response.data);
            } catch (error) {
                message.error(error?.message);
                navigate(`/company`);
            }
        };
        fetchCompany();
    }, []);
    const items = [
        {
            key: 'CompanyDetail',
            label: 'Company Detail',
            children: <CompanyDetail />,
        },
        {
            key: 'PurchasedLicence',
            label: 'Purchased Licence',
            // children: <Permission />,
            disabled: !companyId,
        },
        {
            key: 'LicenceRequest',
            label: 'Licence Request',
            // children: <Role />,
            disabled: !companyId,
        },
    ];

    console.log(company);
    return <Tabs destroyInactiveTabPane={true} defaultActiveKey="CompanyDetail" items={items} />;
}

export default Company;
