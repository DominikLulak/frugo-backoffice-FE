import {useEffect, useState} from "react";
import type {Role, RoleDetail} from "../../../types/role.ts";
import {getRoleDetail, getRoles} from "../../../api/RoleApi.ts";
import RoleModal from "../../../components/rbac/RoleModal.tsx";

export default function RolePage(){
    const [roles, setRoles] = useState<Role[]>([])
    const [selectedRole, setSelectedRole] = useState<RoleDetail | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRoles();
            setRoles(data)
        }
        fetchData()
    }, []);

    const openRole = async (role: Role) => {
        const data = await getRoleDetail(role.id)
        setSelectedRole(data)
    }

    return(
        <div className="container-fluid">
            <h1>Seznam roli</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>Kod role</th>
                        <th>Nazev role</th>
                    </tr>
                </thead>

                <tbody>
                {roles.map(role => (
                    <tr key={role.id}>
                        <td>
                            <button
                                className="btn btn-link p-0"
                                onClick={() => openRole(role)}
                            >
                                {role.code}
                            </button>
                        </td>
                        <td>{role.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedRole && (
                <RoleModal
                    role={selectedRole}
                    onClose={() => setSelectedRole(null)}
                />
            )}
        </div>
    )
}