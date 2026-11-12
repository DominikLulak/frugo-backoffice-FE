import type {JobPosition} from "../../../../types/department.ts";

type Props = {
    jobPositions: JobPosition[];
    onEdit: (jobPosition: JobPosition) => void;
    onCreate: () => void;
    onOpen: (jobPosition: JobPosition) => void;
}

export default function JobPositionTable({jobPositions, onEdit, onCreate, onOpen}:Props){
    return(
        <div className="table-responsive">
            <h6 className="mt-4">Pracovni pozice</h6>
            <button
                type="button"
                className="btn btn-success btn-sm mb-3"
                onClick={onCreate}
            >
                Pridat kontakt
            </button>

            {jobPositions.length === 0 ? (
                <p>Zadna pracovni pozice</p>
            ) : (
                <table className="table table-sm">
                    <thead>
                    <tr>
                        <th>Kod pozice</th>
                        <th>Nazev pozice</th>
                        <th>Popis pozice</th>
                        <th>Akce</th>
                    </tr>
                    </thead>

                    <tbody>
                    {jobPositions.map((jobPosition) => (
                        <tr key={jobPosition.id}>
                            <td>{jobPosition.code}</td>
                            <td>{jobPosition.name}</td>
                            <td>{jobPosition.description}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => onOpen(jobPosition)}
                                >
                                    Detail
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-warning ms-2"
                                    onClick={() => onEdit(jobPosition)}
                                >
                                    Upravit
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}