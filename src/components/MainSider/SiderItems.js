import React from 'react';
import User from '../../pages/User/User';
import LicenceProduct from '../../pages/LicenceProduct/LicenceProduct';
import LicenceType from '../../pages/LicenceType/LicenceType';
import Company from '../../pages/Company/Company';
const SiderItems = [
    {
        key: 'UserManagement',
        text: 'User Management',
        linkTo: 'users',
        children: null,
        element: <User />,
        selectedDefault: true,
    },
    {
        key: 'LicenceProduct',
        text: 'Licence Product',
        linkTo: 'licence-product',
        children: null,
        element: <LicenceProduct />,
    },
    {
        key: 'LicenceType',
        text: 'Licence Type',
        linkTo: 'licence-type',
        children: null,
        element: <LicenceType />,
    },
    {
        key: 'Company',
        text: 'Company',
        linkTo: 'company',
        children: null,
        element: <Company />,
    },
];

export default SiderItems;
