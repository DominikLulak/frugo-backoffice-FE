import {useEffect, useState} from "react";
import {getEmployees, getEmployeeDetail} from "../../../api/EmployeeApi.ts";
import EmployeeModal from "../../../components/employees/EmployeeModal.tsx";

export default function EmployeePage(){
    const [employees, setEmployees] = useState<any[]>([])
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null)

    const [personalNumber, setPersonalNumber] = useState("")
    const [fullName, setFullName] = useState("")
    const [position, setPosition] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [shift, setShift] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEmployees();
            setEmployees(data)
        }
        fetchData()
    }, []);

    const handleFilter = async () =>{
        const data = await getEmployees(
            personalNumber,
            fullName,
            position,
            phoneNumber,
            shift
        )
        setEmployees(data)
    }

    const openEmployee = async (employee: any)=> {
        const data = await getEmployeeDetail(employee.personalNumber)
        setSelectedEmployee(data)
    }

    return(
        <div className="container-fluid">
            <h1>Zamestnanci</h1>

            <div className="row g-2 mb-4">
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Osobni cislo"
                        value={personalNumber}
                        onChange={(e)=> setPersonalNumber(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="Jmeno"
                        value={fullName}
                        onChange={(e)=> setFullName(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Pracovni pozice"
                        value={position}
                        onChange={(e)=> setPosition(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Telefon"
                        value={phoneNumber}
                        onChange={(e)=> setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Smena"
                        value={shift}
                        onChange={(e)=> setShift(e.target.value)}
                    />
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
                    <th>Osobni cislo</th>
                    <th>Jmeno</th>
                    <th>Pracovni pozice</th>
                    <th>Telefon</th>
                    <th>Smena</th>
                </tr>
                </thead>

                <tbody>
                {employees.map(e => (
                    <tr key={e.personalNumber}>
                        <td
                            style={{cursor: "pointer", color: "blue"}}
                            onClick={() => openEmployee(e)}
                        >
                            {e.personalNumber}
                        </td>
                        <td>{e.firstName} {e.lastName}</td>
                        <td>{e.position}</td>
                        <td>{e.phoneNumber}</td>
                        <td>{e.shift}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedEmployee && (
                <EmployeeModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)}/>
            )}
        </div>
    )

}