import type {Permission, RoleDetail, User} from "../../types/role.ts";

type Props = {
    role: RoleDetail;
    onClose: () => void;
}

export default function RoleModal({
    role,
    onClose
}:Props){

    return(
        <div
            className="modal-backdrop-custom"
            onClick={onClose}
        >
            <div
                className="modal-custom"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content-custom">

                    <div className="modal-header">
                        <h5>Detail role {role.name}</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body">
                        <h6>Permissions</h6>
                        {role.permissions.length === 0 ? (
                            <p>No permissions</p>
                        ) : (
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Permission code</th>
                                        <th>Permission name</th>
                                        <th>Module name</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>

                                <tbody>
                                {role.permissions.map((permission:Permission) => (
                                    <tr key={permission.id}>
                                        <td>{permission.permissionCode}</td>
                                        <td>{permission.permissionName}</td>
                                        <td>{permission.moduleName}</td>
                                        <td>{permission.permissionDescription}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}

                        <h6 className="mt-4">Users</h6>
                        {role.users.length === 0 ? (
                            <p>No users</p>
                        ) : (
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Employee Number</th>
                                        <th>Department</th>
                                        <th>Job Position</th>
                                    </tr>
                                </thead>

                                <tbody>
                                {role.users.map((user:User) => (
                                    <tr key={user.id}>
                                        <td>{user.fullName}</td>
                                        <td>{user.employeeNumber}</td>
                                        <td>{user.departmentName}</td>
                                        <td>{user.jobPositionName}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}