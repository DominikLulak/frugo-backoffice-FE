import type {Employee} from "./employee.ts";

export type Department = {
    id: number;
    code: string;
    name: string;
    description: string;
}

export type JobPosition = {
    id: number;
    departmentName: string;
    code: string;
    name: string;
    description: string;
}

export type DepartmentDetail = {
    id: number;
    code: string;
    name: string;
    description: string;
    positions: JobPosition[];
}

export type JobPositionDetail = {
    id: number;
    departmentName: string;
    code: string;
    name: string;
    description: string;
    employees: Employee[];
}