import {useEffect, useState} from "react";
import type {User, UserDetail} from "../../../types/role.ts";
import {getUserDetail, getUsers} from "../../../api/UserApi.ts";
import UserModal from "../../../components/rbac/UserModal.tsx";

export default function UserPage(){
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUsers();
            setUsers(data)
        }
        fetchData()
    }, []);

    const openUser = async (user:User) => {
        const data = await getUserDetail(user.id)
        setSelectedUser(data)
    }

    return(
        <div className="container-fluid">
            <h1>Seznam uzivatelu</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>Employee number</th>
                        <th>Jmeno</th>
                        <th>Department name</th>
                        <th>Job postion name</th>
                    </tr>
                </thead>

                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>
                            <button
                                className="btn btn-link p-0"
                                onClick={() => openUser(user)}
                            >
                                {user.employeeNumber}
                            </button>
                        </td>
                        <td>{user.fullName}</td>
                        <td>{user.departmentName}</td>
                        <td>{user.jobPositionName}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedUser && (
                <UserModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </div>
    )
}