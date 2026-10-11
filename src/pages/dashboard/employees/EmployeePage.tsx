import {useState} from "react";
import {getEmployeeDetail} from "../../../api/EmployeeApi.ts";
import type {Employee, EmployeeDetail} from "../../../types/employee.ts";
import EmployeeModal from "../../../components/employees/modal/EmployeeModal.tsx";
import useEmployee from "../../../hooks/employee/useEmployee.ts";
import PageHeader from "../../../components/common/PageHeader.tsx";
import EmployeeFilters from "../../../components/employees/EmployeeFilters.tsx";
import EmployeeEditModal from "../../../components/employees/modal/EmployeeEditModal.tsx";
import Table, {type TableColumn} from "../../../components/common/Table.tsx";
import DetailButton from "../../../components/common/buttons/DetailButton.tsx";
import EditButton from "../../../components/common/buttons/EditButton.tsx";

export default function EmployeePage(){
    const{
        employees,
        filters,
        updateFilters,
        fetchEmployees,
        loading,
        loadError,
        toggleError,
        setToggleError,
        handleToggleActive
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

    const refreshSelectedEmployee = async () => {
        if(!selectedEmployee) return;

        const data = await getEmployeeDetail(selectedEmployee.id)
        setSelectedEmployee(data)
    }

    const columns: TableColumn<Employee>[] = [
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
                        onClick={() => openEmployee(employee)}
                    />
                    <EditButton
                        onClick={() => openEditingModal(employee)}
                    />
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleToggleActive(employee)}
                    >
                        {employee.active
                            ? "✓ Deaktivovat"
                            : "✓ Aktivovat"
                        }
                    </button>
                </div>
            )
        },
    ]

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

            <Table<Employee>
                columns={columns}
                data={employees}
                getRowKey={(employee) => employee.id}
                loading={loading}
                error={loadError}
                loadingText="Nacitam zamestnance..."
                emptyMessage="Nebyli nalezeni zadni zamestnanci"
            />

            {toggleError && (
                <div className="alert alert-danger mt-2">
                    {toggleError}
                    <button
                        type="button"
                        className="btn-close float-end"
                        aria-label="Zavřít"
                        onClick={() => setToggleError("")}
                    />
                </div>
            )}

            {selectedEmployee && (
                <EmployeeModal
                    employee={selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                    onCreate={refreshSelectedEmployee}
                    onSaved={async () => {
                        const updateEmployee = await getEmployeeDetail(
                            selectedEmployee.id
                        )
                        setSelectedEmployee(updateEmployee)
                        await fetchEmployees(true, filters)
                    }}
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