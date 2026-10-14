import {useState} from "react";
import type {User, UserDetail} from "../../../../types/role.ts";
import {getUserDetail} from "../../../../api/UserApi.ts";

type Props = {
    onSaved: () => void | Promise<void>
}

export default function useUserModal({onSaved}:Props){
    const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)

    const openDetail = async (user: User) => {
        const data = await getUserDetail(user.id)
        setSelectedUser(data)
    }

    const closeDetail = () => {
        setSelectedUser(null)
    }

    const refreshSelectedUser = async () => {
        if (!selectedUser) return

        const data = await getUserDetail(selectedUser.id)
        setSelectedUser(data)
    }

    const handleUserSave = async () => {
        await onSaved()

        if(selectedUser){
            await refreshSelectedUser()
        }
    }

    return{
        selectedUser, openDetail, closeDetail, refreshSelectedUser, handleUserSave
    }
}