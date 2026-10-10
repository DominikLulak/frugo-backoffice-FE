export type Employee = {
    id: number;
    employeeNumber: string;
    name: string;
    shiftCode: string;
    departmentName: string;
    jobPositionName: string;
    active: boolean;
}

export type EmployeeDetail = {
    id: number;
    employeeNumber: string;
    name: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    birthDate: string;
    hireDate: string;
    phone: string;
    email: string;
    systemUsername: string;
    shiftId: number;
    shiftCode: string;
    departmentId: number;
    departmentName: string;
    jobPositionId: number;
    jobPositionName: string;
    active: boolean;
    terminationDate: string | null;
    loginUsername: string | null;
}

export type EmployeeCreateDto = {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    birthDate: string;
    shiftId: number;
    jobPositionId: number;
    systemUsername: string;
    phone: string;
    email: string;
}