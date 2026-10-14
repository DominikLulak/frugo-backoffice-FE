import type {TableColumn} from "../../../../components/common/Table.tsx";
import type {User} from "../../../../types/role.ts";

export default function useRoleUserColumns(): TableColumn<User>[]{
    return [
        {
            key: "fullName",
            header: "Name",
            render: (user) => user.fullName
        },
        {
            key: "employeeNumber",
            header: "Employee Number",
            render: (user) => user.employeeNumber
        },
        {
            key: "departmentName",
            header: "Department Name",
            render: (user) => user.departmentName
        },
        {
            key: "jobPositionName",
            header: "Job position Name",
            render: (user) => user.jobPositionName
        },
    ]
}