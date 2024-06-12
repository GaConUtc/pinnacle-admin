import React from 'react';
import { Card } from 'antd';
import MainContentHeader from '../../../components/MainContentHeader/MainContentHeader';

function CreateUpdateCompany({ companyId }) {
    return (
        <Card title={<MainContentHeader titleLeft={companyId ? 'Company' : 'New Company'} />}>CreateUpdateCompany</Card>
    );
}

export default CreateUpdateCompany;
