import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'antd';
import MainContentHeader from '../../../components/MainContentHeader/MainContentHeader';

function CompanyDetail() {
    const { companyId } = useParams();
    return (
        <Card title={<MainContentHeader titleLeft={companyId ? 'Company' : 'New Company'} />}>CreateUpdateCompany</Card>
    );
}

export default CompanyDetail;
