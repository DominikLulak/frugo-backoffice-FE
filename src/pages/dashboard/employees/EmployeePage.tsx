import type {Employee} from "../../../types/employee.ts";
import EmployeeModal from "../../../components/employees/modal/EmployeeModal.tsx";
import useEmployeeList from "../../../hooks/employee/page/useEmployeeList.ts";
import PageHeader from "../../../components/common/PageHeader.tsx";
import EmployeeEditModal from "../../../components/employees/modal/EmployeeEditModal.tsx";
import Table from "../../../components/common/Table.tsx";
import useEmployeeTableColumns from "../../../hooks/employee/page/useEmployeeTableColumns.tsx";
import useEmployeeModals from "../../../hooks/employee/useEmployeeModals.ts";
import Filters from "../../../components/common/filters/Filters.tsx";
import useEmployeeFilters from "../../../hooks/employee/page/useEmployeeFilters.ts";

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
    } = useEmployeeList()

    const filterFields = useEmployeeFilters({
        filters,
        updateFilters
    })

    const employeeModals = useEmployeeModals({
        onSaved: () => fetchEmployees(true, filters)
    })

    const handleFilter = async () => {
        await fetchEmployees(true, filters)
    }

    const columns = useEmployeeTableColumns({
        onDetail: employeeModals.openDetail,
        onEdit: employeeModals.openEdit,
        onToggleActive: handleToggleActive
    })

    return(
        <div className="container-fluid">
            <PageHeader
                title="Zamestnanci"
                actionLabel="Pridat zamestnance"
                onAction={employeeModals.openCreate}
            />


            <Filters
                fields={filterFields}
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

            {employeeModals.selectedEmployee && (
                <EmployeeModal
                    employee={employeeModals.selectedEmployee}
                    onClose={employeeModals.closeDetail}
                    onCreate={employeeModals.refreshSelectedEmployee}
                    onSaved={employeeModals.handleEmployeeSaved}
                />
            )}

            <EmployeeEditModal
                key={`${employeeModals.showEditModal}-${employeeModals.editingEmployee?.id ?? "new"}`}
                show={employeeModals.showEditModal}
                employee={employeeModals.editingEmployee}
                onClose={employeeModals.closeEdit}
                onSaved={() => fetchEmployees(true, filters)}
            />
        </div>
    )

}