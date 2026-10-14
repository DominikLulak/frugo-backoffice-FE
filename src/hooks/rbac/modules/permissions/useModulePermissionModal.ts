import {useState} from "react";
import type {Permission} from "../../../../types/role.ts";

export default function useModulePermissionModal(){
    const [showPermissionModal, setShowPermissionModal] = useState(false)
    const [editingPermission, setEditingPermission] = useState<Permission | null>(null)

    const openCreatePermission = () => {
        setEditingPermission(null)
        setShowPermissionModal(true)
    }

    const openEditPermission = (permission: Permission) => {
        setEditingPermission(permission)
        setShowPermissionModal(true)
    }

    const closePermissionModal = () => {
        setShowPermissionModal(false)
        setEditingPermission(null)
    }

    return{
        showPermissionModal,
        editingPermission,
        openEditPermission,
        openCreatePermission,
        closePermissionModal
    }
}