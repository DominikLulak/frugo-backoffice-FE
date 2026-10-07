import {useEffect, useState} from "react";
import type {Department, DepartmentDetail} from "../../../types/department.ts";
import {getDepartmentDetail, getDepartments} from "../../../api/DepartmentApi.ts";
import DepartmentModal from "../../../components/employees/DepartmentModal.tsx";

export default function DepartmentPage(){
    const [departments, setDepartments] = useState<Department[]>([])
    const [selectedDepartment, setSelectedDepartment] = useState<DepartmentDetail | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDepartments();
            setDepartments(data)
        }
        fetchData()
    }, []);

    const openDepartment = async (department: Department) => {
        const data = await getDepartmentDetail(department.id)
        setSelectedDepartment(data)
    }

    return(
        <div className="container-fluid">
            <h1>Seznam oddeleni</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>Kod oddeleni</th>
                        <th>Jmeno oddeleni</th>
                        <th>Popis oddeleni</th>
                    </tr>
                </thead>

                <tbody>
                {departments.map(department => (
                    <tr key={department.id}>
                        <td>
                            <button
                                className="btn btn-link p-0"
                                onClick={() => openDepartment(department)}
                            >
                                {department.code}
                            </button>
                        </td>
                        <td>{department.name}</td>
                        <td>{department.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedDepartment && (
                <DepartmentModal
                    department={selectedDepartment}
                    onClose={() => setSelectedDepartment(null)}
                />
            )}
        </div>
    )
}