import {useState} from "react";
import type {Permission} from "../../../../types/role.ts";
import {removePermissionFromRole} from "../../../../api/RoleApi.ts";

type Props = {
    roleId: number;
    roleCode: string;
    onRefresh: () => void | Promise<void>;
}

export default function useRoleRemovePermission({roleId, roleCode, onRefresh }:Props){
    const [permissionToRemove, setPermissionToRemove] = useState<Permission | null>(null)
    const [removingPermission, setRemovingPermission] = useState(false)
    const [removeError, setRemoveError] = useState("")

    const requestRemovePermission = (permission: Permission) => {
        if(roleCode === "GOD") return

        setRemoveError("")
        setPermissionToRemove(permission)
    }

    const confirmRemovePermission = async () => {
        if(
            !permissionToRemove ||
            roleCode === "GOD" ||
            removingPermission
        ){
            return
        }

        setRemoveError("")

        try{
            setRemovingPermission(true)

            await removePermissionFromRole(
                roleId,
                permissionToRemove.id
            )

            await onRefresh()
            setPermissionToRemove(null)
        }catch{
            setRemoveError("Nepodarilo se odebrat opravneni")
        }finally {
            setRemovingPermission(false)
        }
    }

    const closeRemovePermissionModal = () => {
        if(removingPermission) return

        setPermissionToRemove(null)
        setRemoveError("")
    }

    return{
        permissionToRemove,
        removingPermission,
        removeError,
        requestRemovePermission,
        confirmRemovePermission,
        closeRemovePermissionModal
    }
}