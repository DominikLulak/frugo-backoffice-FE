import "../modal.css"
import {useState} from "react";
import type {DepartmentDetail, JobPositionDetail} from "../../types/department.ts";
import {getJobPositionDetail} from "../../api/DepartmentApi.ts";
import JobPositionModal from "./JobPositionModal.tsx";

type Props = {
    department: DepartmentDetail;
    onClose: () => void;
}

export default function DepartmentModal({
                                            department,
                                            onClose
}:Props){

    const [jobPosition, setJobPosition] = useState<JobPositionDetail | null>(null)

    const openJobPosition = async (jobPositionId: number) => {
        const data = await getJobPositionDetail(jobPositionId)

        setJobPosition(data)
    }

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
                        <h5>Detail oddeleni {department.name}</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body">
                        <h6>Oddeleni</h6>
                        <table className="table table-sm">
                            <tbody>
                            <tr>
                                <th>Kod oddeleni</th>
                                <td>{department.code}</td>
                            </tr>
                            <tr>
                                <th>Nazev oddeleni</th>
                                <td>{department.name}</td>
                            </tr>
                            <tr>
                                <th>Popis oddeleni</th>
                                <td>{department.description}</td>
                            </tr>
                            </tbody>
                        </table>

                        <h6 className="mt-4">Pracovni pozice</h6>
                        {department.positions.length === 0 ? (
                            <p>Zadme pozice</p>
                        ) : (
                            <table className="table table-sm">
                                <thead>
                                <tr>
                                    <th>Nazev oddeleni</th>
                                    <th>Kod pozice</th>
                                    <th>Nazec pozice</th>
                                    <th>Popis pozice</th>
                                </tr>
                                </thead>

                                <tbody>
                                {department.positions.map((position) => (
                                    <tr key={position.id}>
                                        <td>{position.departmentName}</td>
                                        <td>
                                            <button
                                                className="btn btn-link p-0"
                                                onClick={() => openJobPosition(position.id)}
                                            >
                                                {position.code}
                                            </button>
                                        </td>
                                        <td>{position.name}</td>
                                        <td>{position.description}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {jobPosition && (
                <JobPositionModal
                    position={jobPosition}
                    onClose={() => setJobPosition(null)}
                />
            )}

        </div>
    )
}