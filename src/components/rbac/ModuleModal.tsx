import type {ModuleDetail, Permission} from "../../types/role.ts";

type Props = {
    module: ModuleDetail
    onClose: () => void
}

export default function ModuleModal({
    module,
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
                        <h5>Detail modulu {module.moduleName}</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body">
                        <h6>Permissions</h6>
                        {module.permissions.length === 0 ? (
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
                                {module.permissions.map((permission:Permission) => (
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
                    </div>
                </div>
            </div>
        </div>
    )
}