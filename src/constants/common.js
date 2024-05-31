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
        key: 1,
        value: 'descend',
    },
};
export { ACCESS_TOKEN, COMMON_STATUS, SORT_TYPE };
