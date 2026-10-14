import type {UserDetail} from "../../../../types/role.ts";
import useRoleList from "../../roles/page/useRoleList.ts";
import {useMemo, useState} from "react";

export default function useUserAvailableRoles(user: UserDetail){
    const {roles, loading: rolesLoading, loadError: roleError} = useRoleList()

    const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null)

    const availableRoles = useMemo(() => {
        const assignedRolesId = new Set(
            user.roles.map((role) => role.id)
        )

        return roles.filter((role) => !assignedRolesId.has(role.id))
    }, [roles, user.roles])

    const selectedRole = (roleId: number | null) => {
        setSelectedRoleId(roleId)
    }

    return{
        availableRoles, selectedRoleId, selectedRole,
        rolesLoading, roleError
    }
}