import type {Employee} from "../../../types/employee.ts";
import type {TableColumn} from "../../../components/common/Table.tsx";
import DetailButton from "../../../components/common/buttons/DetailButton.tsx";
import EditButton from "../../../components/common/buttons/EditButton.tsx";
import StatusButton from "../../../components/common/buttons/StatusButton.tsx";

type Props = {
    onDetail: (employee: Employee) => void;
    onEdit: (employee: Employee) => void;
    onToggleActive: (employee: Employee) => void;
}

export default function useEmployeeTableColumns({onDetail, onEdit, onToggleActive}:Props):TableColumn<Employee>[]{
    return [
        {
            key: "employeeNumber",
            header: "Osobni cislo",
            render: (employee) => employee.employeeNumber
        },
        {
            key: "name",
            header: "Jmeno",
            render: (employee) => employee.name
        },
        {
            key: "shiftCode",
            header: "Smena",
            render: (employee) => employee.shiftCode
        },
        {
            key: "departmentName",
            header: "Oddeleni",
            render: (employee) => employee.departmentName
        },
        {
            key: "jobPositionName",
            header: "Pracovni pozice",
            render: (employee) => employee.jobPositionName
        },
        {
            key: "actions",
            header: "Akce",
            render: (employee) => (
                <div className="d-flex gap-2">
                    <DetailButton
                        onClick={() => onDetail(employee)}
                    />
                    <EditButton
                        onClick={() => onEdit(employee)}
                    />
                    <StatusButton
                        active={employee.active}
                        onClick={() => onToggleActive(employee)}
                    />
                </div>
            )
        },
    ]
}