export type Role = {
    id: number;
    code: string;
    name: string;
}

export type Permission = {
    id: number;
    moduleName: string;
    permissionCode: string;
    permissionName: string;
    permissionDescription: string;
}

export type User = {
    id: number;
    employeeNumber: string;
    fullName: string;
    departmentName: string;
    jobPositionName: string;
}

export type RoleDetail = {
    id: number;
    code: string;
    name: string;
    permissions: Permission[];
    users: User[];
}

export type UserDetail = {
    id: number;
    employeeNumber: string;
    fullName: string;
    loginName: string;
    systemUsername: string;
    departmentName: string;
    jobPositionName: string;
    roles: Role[];
}

export type Module = {
    id: number;
    moduleCode: string;
    moduleName: string;
}

export type ModuleDetail = {
    id: number;
    moduleCode: string;
    moduleName: string;
    permissions: Permission[];
}