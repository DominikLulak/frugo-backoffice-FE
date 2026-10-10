import {useState} from "react";
import {getEmployeeDetail} from "../../../api/EmployeeApi.ts";
import type {Employee, EmployeeDetail} from "../../../types/employee.ts";
import EmployeeModal from "../../../components/employees/modal/EmployeeModal.tsx";
import useEmployee from "../../../hooks/employee/useEmployee.ts";
import PageHeader from "../../../components/common/PageHeader.tsx";
import EmployeeFilters from "../../../components/employees/EmployeeFilters.tsx";
import EmployeeTable from "../../../components/employees/EmployeeTable.tsx";
import EmployeeEditModal from "../../../components/employees/modal/EmployeeEditModal.tsx";

export default function EmployeePage(){
    const{
        employees,
        filters,
        updateFilters,
        fetchEmployees,
        loading,
        loadError
    } = useEmployee()

    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDetail | null>(null)

    const [showModal, setShowModal] = useState(false)
    const [editingEmployee, setEditingEmployee] = useState<EmployeeDetail | null>(null)

    const handleFilter = async () => {
        await fetchEmployees(true, filters)
    }

    const openEmployee = async (employee: Employee) => {
        const data = await getEmployeeDetail(employee.id)
        setSelectedEmployee(data)
    }

    const openCreateModal = () => {
        setEditingEmployee(null)
        setShowModal(true)
    }

    const openEditingModal = async (employee: Employee) => {
        const data = await getEmployeeDetail(employee.id)
        setEditingEmployee(data)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setEditingEmployee(null)
    }

    return(
        <div className="container-fluid">
            <PageHeader
                title="Zamestnanci"
                actionLabel="Pridat zamestnance"
                onAction={openCreateModal}
            />

            <EmployeeFilters
                employeeNumber={filters.employeeNumber}
                name={filters.name}
                shiftCode={filters.shiftCode}
                departmentName={filters.departmentName}
                jobPositionCode={filters.jobPositionCode}
                active={filters.active}
                onEmployeeNumberChange={(value) => updateFilters("employeeNumber", value)}
                onNameChange={(value) => updateFilters("name", value)}
                onShiftCodeChange={(value) => updateFilters("shiftCode", value)}
                onDepartmentNameChange={(value) => updateFilters("departmentName", value)}
                onJobPositionCodeChange={(value) => updateFilters("jobPositionCode", value)}
                onActiveChange={(value) => updateFilters("active", value)}
                onSubmit={handleFilter}
            />

            <EmployeeTable
                employees={employees}
                onOpen={openEmployee}
                onEdit={openEditingModal}
                loading={loading}
                error={loadError}
            />

            {selectedEmployee && (
                <EmployeeModal
                    employee={selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                />
            )}

            <EmployeeEditModal
                key={`${showModal}-${editingEmployee?.id ?? "new"}`}
                show={showModal}
                employee={editingEmployee}
                onClose={closeModal}
                onSaved={() => fetchEmployees(true, filters)}
            />
        </div>
    )

}