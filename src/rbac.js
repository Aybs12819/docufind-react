const roles = {
    ADMIN: 'admin',
    PROCESS_OWNER: 'process_owner',
    DCC: 'dcc',
};

const permissions = {
    [roles.ADMIN]: ['create', 'edit', 'delete', 'view'],
    [roles.PROCESS_OWNER]: ['add', 'view', 'edit'],
    [roles.DCC]: ['view'],
};

const checkPermission = (role, action) => {
    return permissions[role] && permissions[role].includes(action);
};

export { roles, checkPermission };
