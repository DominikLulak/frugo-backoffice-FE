import {useState} from "react";
import type {Employee, EmployeeDetail} from "../../types/employee.ts";
import {getEmployeeDetail} from "../../api/EmployeeApi.ts";

type Props = {
    onSaved: () => void | Promise<void>;
}

export default function useEmployeeModals({onSaved}:Props){

    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDetail | null>(null)
    const [editingEmployee, setEditingEmployee] = useState<EmployeeDetail | null>(null)

    const [showEditModal, setShowEditModal] = useState(false)

    const openDetail = async (employee: Employee) =>{
        const data = await getEmployeeDetail(employee.id)
        setSelectedEmployee(data)
    }

    const closeDetail = ()  => {
        setSelectedEmployee(null)
    }

    const openCreate = () => {
        setEditingEmployee(null)
        setShowEditModal(true)
    }

    const openEdit = async (employee: Employee) => {
        const data = await getEmployeeDetail(employee.id)
        setEditingEmployee(data)
        setShowEditModal(true)
    }

    const closeEdit = () => {
        setEditingEmployee(null)
        setShowEditModal(false)
    }

    const refreshSelectedEmployee = async () => {
        if(!selectedEmployee) return

        const data = await getEmployeeDetail(selectedEmployee.id)
        setSelectedEmployee(data)
    }

    const handleEmployeeSaved = async () => {
        await onSaved()

        if(selectedEmployee){
            await refreshSelectedEmployee()
        }
    }

    return{
        selectedEmployee,
        editingEmployee,
        showEditModal,
        openDetail,
        closeDetail,
        openCreate,
        openEdit,
        closeEdit,
        refreshSelectedEmployee,
        handleEmployeeSaved
    }
}