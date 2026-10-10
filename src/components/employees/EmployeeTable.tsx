import type {Employee} from "../../types/employee.ts";

type Props = {
    employees: Employee[];
    onOpen: (employee: Employee) => void;
    onEdit: (employee: Employee) => void;
    loading?: boolean;
    error?: string;
}

export default function EmployeeTable({
    employees,
    onOpen,
    onEdit,
    loading,
    error
}:Props){
    return(
        <div className="table-responsive">

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {loading ? (
                <p>Nacitam zamestnance...</p>
            ): (
                <table className="table">
                    <thead>
                    <tr>
                        <th>Osobní číslo</th>
                        <th>Jméno</th>
                        <th>Smena</th>
                        <th>Oddeleni</th>
                        <th>Praovni pozice</th>
                        <th>Aktivni</th>
                        <th>Akce</th>
                    </tr>
                    </thead>

                    <tbody>
                    {employees.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="text-center py-4">
                                Nebyli nalezeni zadni zamestnanci
                            </td>
                        </tr>
                    ): (
                        employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.employeeNumber}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.shiftCode}</td>
                                    <td>{employee.departmentName}</td>
                                    <td>{employee.jobPositionName}</td>
                                    <td>{employee.active ? "Ano" : "Ne"}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => onOpen(employee)}
                                            >
                                                Detail
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-warning"
                                                onClick={() => onEdit(employee)}
                                            >
                                                ✏ Upravit
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                    )}


                    </tbody>
                </table>
            )}
        </div>
    )
}