import type {KeyValueRow} from "../../../../components/common/KeyValueTable.tsx";
import type {UserDetail} from "../../../../types/role.ts";

export type UserDetailSection = {
    title: string;
    rows: KeyValueRow[]
}

export default function useUserDetailSection(
    user: UserDetail
):UserDetailSection[]{
    return[
        {
            title: "User",
            rows:[
                {label: "Employee Number", value: user.employeeNumber},
                {label: "Employee Name", value: user.fullName},
                {label: "Login Name", value: user.loginName},
                {label: "System Username", value: user.systemUsername},
                {label: "Department Name", value: user.departmentName},
                {label: "Job Position Name", value: user.jobPositionName},
            ]
        }
    ]
}