import {useState} from "react";
import type {Department, DepartmentDetail} from "../../../types/department.ts";
import {getDepartmentDetail} from "../../../api/DepartmentApi.ts";
import DepartmentModal from "../../../components/employees/modal/department/DepartmentModal.tsx";
import PageHeader from "../../../components/common/PageHeader.tsx";
import DepartmentEditModal from "../../../components/employees/modal/department/DepartmentEditModal.tsx";
import useDepartment from "../../../hooks/department/useDepartment.ts";
import DepartmentTable from "../../../components/employees/modal/department/DepartmentTable.tsx";

export default function DepartmentPage(){
    const{
        departments,
        fetchDepartments,
        loading,
        loadError
    } = useDepartment()

    const [selectedDepartment, setSelectedDepartment] = useState<DepartmentDetail | null>(null)

    const [showModal, setShowModal] = useState(false)
    const [editingDepartment, setEditingDepartment] = useState<DepartmentDetail | null>(null);

    const openDepartment = async (department: Department) => {
        const data = await getDepartmentDetail(department.id)
        setSelectedDepartment(data)
    }

    const openCreateModal = () => {
        setEditingDepartment(null)
        setShowModal(true)
    }

    const openEditingModal = async (department: Department) => {
        const data = await getDepartmentDetail(department.id)
        setEditingDepartment(data)
        setShowModal(true)
    }

    const closeModal = async () => {
        setShowModal(false)
        setEditingDepartment(null)
    }

    const refreshSelectedDepartment = async () => {
        if(!selectedDepartment) return

        const data = await getDepartmentDetail(selectedDepartment.id)
        setSelectedDepartment(data)
    }

    return(
        <div className="container-fluid">
            <PageHeader
                title="Seznam oddeleni"
                actionLabel="Pridat oddeleni"
                onAction={openCreateModal}
            />

            <DepartmentTable
                departments={departments}
                onOpen={openDepartment}
                onEdit={openEditingModal}
                loading={loading}
                error={loadError}
            />

            {selectedDepartment && (
                <DepartmentModal
                    department={selectedDepartment}
                    onClose={() => setSelectedDepartment(null)}
                    onSaved={refreshSelectedDepartment}
                />
            )}

            <DepartmentEditModal
                key={`${showModal}-${editingDepartment?.id ?? "new"}`}
                show={showModal}
                department={editingDepartment}
                onClose={closeModal}
                onSaved={() => fetchDepartments()}
            />
        </div>
    )
}