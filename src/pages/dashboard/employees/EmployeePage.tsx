import {useEffect, useState} from "react";
import {getEmployeeDetail, getEmployees} from "../../../api/EmployeeApi.ts";
import type {Employee, EmployeeDetail} from "../../../types/employee.ts";
import EmployeeModal from "../../../components/employees/EmployeeModal.tsx";

export default function EmployeePage(){
    const [employees, setEmployees] = useState<Employee[]>([])
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDetail | null>(null)

    const [employeeNumber, setEmployeeNumber] = useState("")
    const [name, setName] = useState("")
    const [shiftCode, setShiftCode] = useState("")
    const [departmentName, setDepartmentName] = useState("")
    const [jobPositionCode, setJobPositionCode] = useState("")
    const [active, setActive] = useState<boolean | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEmployees();
            setEmployees(data)
        }
        fetchData()
    }, []);

    const handleFilter = async () =>{
        const data = await getEmployees(
            employeeNumber,
            name,
            shiftCode,
            departmentName,
            jobPositionCode,
            active
        )
        setEmployees(data)
    }

    const openEmployee = async (employee: Employee) => {
        const data = await getEmployeeDetail(employee.id)
        setSelectedEmployee(data)
    }

    return(
        <div className="container-fluid">
            <h1>Zaměstnanci</h1>

            <div className="row g-2 mb-4">
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Osobní číslo"
                        value={employeeNumber}
                        onChange={(e)=> setEmployeeNumber(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="Jméno"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Smena"
                        value={shiftCode}
                        onChange={(e)=> setShiftCode(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Oddeleni"
                        value={departmentName}
                        onChange={(e)=> setDepartmentName(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Pracovni pozice"
                        value={jobPositionCode}
                        onChange={(e)=> setJobPositionCode(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <select
                        className="form-control"
                        value={active === null ?"" : String(active)}
                        onChange={(e) => {
                            if(e.target.value === ""){
                                setActive(null)
                            }else{
                                setActive(e.target.value === "true")
                            }
                        }}
                    >
                        <option value="">Vse</option>
                        <option value="true">Ano</option>
                        <option value="false">Ne</option>
                    </select>
                </div>

                <div className="col-md-1 d-grid">
                    <button
                        className="btn btn-primary"
                        onClick={handleFilter}
                    >
                        Filtrovat
                    </button>
                </div>
            </div>

            <table className="table">
                <thead>
                <tr>
                    <th>Osobní číslo</th>
                    <th>Jméno</th>
                    <th>Smena</th>
                    <th>Oddeleni</th>
                    <th>Praovni pozice</th>
                    <th>Aktivni</th>
                </tr>
                </thead>

                <tbody>
                {employees.map(employee => (
                    <tr key={employee.id}>
                        <td>
                            <button
                                className="btn btn-link p-0"
                                onClick={() => openEmployee(employee)}
                            >
                                {employee.employeeNumber}
                            </button>
                        </td>
                        <td>{employee.name}</td>
                        <td>{employee.shiftCode}</td>
                        <td>{employee.departmentName}</td>
                        <td>{employee.jobPositionName}</td>
                        <td>{employee.active ? "Ano" : "Ne"}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedEmployee && (
                <EmployeeModal
                    employee={selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                />
            )}
        </div>
    )

}