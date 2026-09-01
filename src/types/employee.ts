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
    employeeNumber: string;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    birthDate: string;
    hireDate: string;
    phone: string;
    email: string;
    systemUsername: string;
    shiftCode: string;
    departmentName: string;
    jobPositionName: string;
    active: boolean;
    terminationDate: string | null;
    loginUsername: string | null;
}