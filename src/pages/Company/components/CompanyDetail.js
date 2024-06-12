import React from 'react';
import { Tabs } from 'antd';

import CreateUpdateCompany from './CreateUpdateCompany';

function CompanyDetail({ companyId }) {
    const items = [
        {
            key: 'CompanyDetail',
            label: 'Company Detail',
            children: <CreateUpdateCompany />,
        },
        {
            key: 'PurchasedLicence',
            label: 'Purchased Licence',
            // children: <Permission />,
            disabled: { companyId },
        },
        {
            key: 'LicenceRequest',
            label: 'Licence Request',
            // children: <Role />,
            disabled: { companyId },
        },
    ];

    return (
        <>
            {/* <div
                to="/company"
                replace={true}
                style={{ color: 'rgb(0, 32, 96)', marginBottom: 10, cursor: 'pointer' }}
                onClick={backToRegister}
            >
                <LeftOutlined style={{ marginRight: 10 }} />
                <span>{'Company Register'}</span>
            </div> */}
            <Tabs destroyInactiveTabPane={true} defaultActiveKey="CompanyDetail" items={items} />
        </>
    );
}

export default CompanyDetail;
