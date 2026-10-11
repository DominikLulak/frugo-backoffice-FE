import type {Department} from "../../../../types/department.ts";

type Props = {
    departments: Department[]
    onOpen: (department: Department) => void
    onEdit: (department: Department) => void
    loading?: boolean;
    error?: string
}

export default function DepartmentTable({departments, onOpen, onEdit, loading, error}:Props){
    return(
        <div className="table-responsive">
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {loading ? (
                <p>Nacitam zamestnance...</p>
            ): (
                <table className="table">
                    <thead>
                    <tr>
                        <th>Kod oddeleni</th>
                        <th>Jmeno oddeleni</th>
                        <th>Popis oddeleni</th>
                        <th>Akce</th>
                    </tr>
                    </thead>

                    <tbody>
                    {departments.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center p-4">
                                Nebyla nalezena zadna oddeleni
                            </td>
                        </tr>
                    ): (
                        departments.map((department) => (
                            <tr key={department.id}>
                                <td>{department.code}</td>
                                <td>{department.name}</td>
                                <td>{department.description}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => onOpen(department)}
                                        >
                                            Detail
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-warning"
                                            onClick={() => onEdit(department)}
                                        >
                                            ✏ Upravit
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            )}
        </div>
    )
}