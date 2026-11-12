import {useState} from "react";
import type {Role} from "../../../../types/role.ts";
import {removeRoleFromUser} from "../../../../api/UserApi.ts";

type Props = {
    userId: number;
    onRefresh: () => void | Promise<void>
}

export default function useUserRemoveRole({userId, onRefresh}:Props){
    const [roleToRemove, setRoleToRemove] = useState<Role | null>(null)
    const [removingRole, setRemovingRole] = useState(false)
    const [removeError, setRemoveError] = useState("")

    const requestRemoveRole = (role: Role) => {
        if(roleToRemove?.code === "GOD") return

        setRemoveError("")
        setRoleToRemove(role)
    }

    const confirmRemoveRole = async () => {
        if(
            !roleToRemove ||
            roleToRemove.code === "GOD" ||
            removingRole
        ){
            return
        }

        setRemoveError("")

        try{
            setRemovingRole(true)

            await removeRoleFromUser(
                userId,
                roleToRemove.id
            )
            await onRefresh()
            setRoleToRemove(null)
        }catch{
            setRemoveError("Nepodarilo se odebrat roli")
        }finally {
            setRemovingRole(false)
        }
    }

    const closeRemoveRoleModal = () => {
        if(removingRole) return

        setRoleToRemove(null)
        setRemoveError("")
    }

    return{
        roleToRemove, removingRole, removeError,
        requestRemoveRole, confirmRemoveRole, closeRemoveRoleModal
    }
}