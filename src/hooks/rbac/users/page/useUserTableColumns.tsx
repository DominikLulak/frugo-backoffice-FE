import type {User} from "../../../../types/role.ts";
import type {TableColumn} from "../../../../components/common/Table.tsx";
import DetailButton from "../../../../components/common/buttons/DetailButton.tsx";

type Props = {
    onDetail: (user: User) => void;
}

export default function useUserTableColumns({onDetail}:Props):TableColumn<User>[]{
    return [
        {
            key: "employeeNumber",
            header: "Employee Number",
            render: (user) => user.employeeNumber
        },
        {
            key: "loginName",
            header: "Login Name",
            render: (user) => user.loginName
        },
        {
            key: "fullName",
            header: "Name",
            render: (user) => user.fullName
        },
        {
            key: "departmentName",
            header: "Department Name",
            render: (user) => user.departmentName
        },
        {
            key: "jobPositionName",
            header: "Job Position Name",
            render: (user) => user.jobPositionName
        },
        {
            key: "actions",
            header: "Actions",
            render: (user) => (
                <div className="d-flex gap-2">
                    <DetailButton
                        onClick={() => onDetail(user)}
                    />
                </div>
            )
        },
    ]
}