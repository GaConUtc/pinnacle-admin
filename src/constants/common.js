const ACCESS_TOKEN = 'accessToken';
const COMMON_STATUS = {
    ACTIVE: {
        key: 1,
        value: 'Active',
    },
    INACTIVE: {
        key: 2,
        value: 'Inactive',
    },
    DELETED: {
        key: 0,
        value: 'Deleted',
    },
};

const SORT_TYPE = {
    NONE: {
        key: 0,
        value: 'none' | 'underfine',
    },
    ASC: {
        key: 1,
        value: 'ascend',
    },
    DESC: {
        key: 2,
        value: 'descend',
    },
};

const PERMISSION_STATUS = {
    NOTAPPLIED: {
        key: 0,
        value: 'NotApplied',
    },
    APPLIED: {
        key: 1,
        value: 'Applied',
    },
};
export { ACCESS_TOKEN, COMMON_STATUS, SORT_TYPE, PERMISSION_STATUS };
