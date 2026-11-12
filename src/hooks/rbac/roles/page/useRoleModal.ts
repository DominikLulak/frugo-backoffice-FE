import {useState} from "react";
import type {Role, RoleDetail} from "../../../../types/role.ts";
import {getRoleDetail} from "../../../../api/RoleApi.ts";

type Props = {
    onSaved: () => void | Promise<void>
}

export default function useRoleModal({onSaved}:Props){
    const [selectedRole, setSelectedRole] = useState<RoleDetail | null>(null)
    const [editingRole, setEditingRole] = useState<RoleDetail | null>(null)

    const [showEditModal, setShowEditModal] = useState(false)

    const openDetail = async (role: Role) =>{
        const data = await getRoleDetail(role.id)
        setSelectedRole(data)
    }

    const closeDetail = () => {
        setSelectedRole(null)
    }

    const openCreate = () => {
        setEditingRole(null)
        setShowEditModal(true)
    }

    const openEdit = async (role: Role) => {
        const data = await getRoleDetail(role.id)
        setEditingRole(data)
        setShowEditModal(true)
    }

    const closeEdit = () => {
        setEditingRole(null)
        setShowEditModal(false)
    }

    const refreshSelectedRole = async () => {
        if(!selectedRole) return

        const data = await getRoleDetail(selectedRole.id)
        setSelectedRole(data)
    }

    const handleRoleSaved = async () => {
        await onSaved()

        if(selectedRole){
            await refreshSelectedRole()
        }
    }

    return{
        selectedRole,
        editingRole,
        showEditModal,
        openDetail,
        closeDetail,
        openCreate,
        openEdit,
        closeEdit,
        refreshSelectedRole,
        handleRoleSaved
    }
}