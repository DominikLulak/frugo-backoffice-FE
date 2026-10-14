import {useCallback, useEffect, useState} from "react";
import type {User} from "../../../../types/role.ts";
import {getUsers} from "../../../../api/UserApi.ts";

export default function useUsersList(){
    const [users, setUsers] = useState<User[]>([])

    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] = useState("")

    const fetchUsers = useCallback(async () => {
        try{
            setLoading(true)
            setLoadError("")

            const data = await getUsers();
            setUsers(data)
        }catch{
            setLoadError("Nepodarilo se nacist uzivatele")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchUsers()
    }, [fetchUsers]);

    return{
        users, loading, loadError, fetchUsers
    }
}