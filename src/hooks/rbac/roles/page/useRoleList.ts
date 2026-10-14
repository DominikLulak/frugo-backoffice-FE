import {useCallback, useEffect, useState} from "react";
import type {Role} from "../../../../types/role.ts";
import {getRoles} from "../../../../api/RoleApi.ts";

export default function useRoleList(){
    const [roles, setRoles] = useState<Role[]>([])

    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] = useState("")

    const fetchRoles = useCallback(async () => {
        try{
            setLoading(true)
            setLoadError("")

            const data = await getRoles();
            setRoles(data)
        }catch{
            setLoadError("Nepodarilo se nacit role")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchRoles()
    }, [fetchRoles]);

    return{
        roles,
        loading,
        loadError,
        fetchRoles
    }
}