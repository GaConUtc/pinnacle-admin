import React from 'react';
import UserManagement from '../../pages/User/UserManagement';
import LicenceProduct from '../../pages/LicenceProduct/LicenceProduct';
import LicenceType from '../../pages/LicenceType/LicenceType';
import CompanyManagement from '../../pages/Company/CompanyManagement';
import Company from '../../pages/Company/components/Company';
const SiderItems = [
    {
        key: 'UserManagement',
        text: 'User Management',
        linkTo: '/users',
        element: <UserManagement />,
        selectedDefault: true,
    },
    {
        key: 'LicenceProduct',
        text: 'Licence Product',
        linkTo: '/licence-product',
        element: <LicenceProduct />,
    },
    {
        key: 'LicenceType',
        text: 'Licence Type',
        linkTo: '/licence-type',
        element: <LicenceType />,
    },
    {
        key: 'Company',
        text: 'Company',
        linkTo: '/company',
        children: {
            key: 'CompanyDetail',
            text: 'Company Detail',
            linkTo: '/company/:companyId',
            element: <Company />,
        },
        element: <CompanyManagement />,
    },
];

export default SiderItems;
