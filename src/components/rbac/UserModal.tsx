import type {Role, UserDetail} from "../../types/role.ts";

type Props = {
    user: UserDetail;
    onClose: () => void;
}

export default function UserModal({
    user,
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
                        <h5>Detail uzivatele {user.fullName}</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body">
                        <h6>User</h6>
                        <table className="table table-sm">
                            <tbody>
                            <tr>
                                <th>Employee Number</th>
                                <td>{user.employeeNumber}</td>
                            </tr>
                            <tr>
                                <th>Employee Name</th>
                                <td>{user.fullName}</td>
                            </tr>
                            <tr>
                                <th>Login username</th>
                                <td>{user.loginName}</td>
                            </tr>
                            <tr>
                                <th>System username</th>
                                <td>{user.systemUsername}</td>
                            </tr>
                            <tr>
                                <th>Department name</th>
                                <td>{user.departmentName}</td>
                            </tr>
                            <tr>
                                <th>Job position</th>
                                <td>{user.jobPositionName}</td>
                            </tr>
                            </tbody>
                        </table>

                        <h6 className="mt-4">Roles</h6>
                        {user.roles.length === 0 ? (
                            <p>No roles</p>
                        ) : (
                            <table className="table table-sm">
                                <thead>
                                <tr>
                                    <th>Role code</th>
                                    <th>Role name</th>
                                </tr>
                                </thead>
                                <tbody>
                                {user.roles.map((role:Role) => (
                                    <tr key={role.id}>
                                        <td>{role.code}</td>
                                        <td>{role.name}</td>
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