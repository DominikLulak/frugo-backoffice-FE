import "../../../modal.css"
import {useState} from "react";
import type {DepartmentDetail, JobPosition, JobPositionDetail} from "../../../../types/department.ts";
import {getJobPositionDetail} from "../../../../api/DepartmentApi.ts";
import JobPositionModal from "./JobPositionModal.tsx";
import JobPositionTable from "./JobPositionTable.tsx";
import JobPositionEditModal from "./JobPositionEditModal.tsx";

type Props = {
    department: DepartmentDetail;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function DepartmentModal({department, onClose, onSaved
}:Props){

    const [jobPosition, setJobPosition] = useState<JobPositionDetail | null>(null)

    const [showAddJobPositionModal, setShowAddJobPositionModal] = useState(false)
    const [editingJobPosition, setEditingJobPosition] = useState<JobPosition | null>(null)

    const openJobPosition = async (jobPositionId: number) => {
        const data = await getJobPositionDetail(jobPositionId)

        setJobPosition(data)
    }

    const openCreateModal = () => {
        setEditingJobPosition(null)
        setShowAddJobPositionModal(true)
    }

    const openEditingModal = async (jobPosition: JobPosition) => {
        setEditingJobPosition(jobPosition)
        setShowAddJobPositionModal(true)
    }

    const closeContactModal = () => {
        setShowAddJobPositionModal(false)
        setEditingJobPosition(null)
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

                        <JobPositionTable
                            jobPositions={department.positions}
                            onEdit={openEditingModal}
                            onCreate={openCreateModal}
                            onOpen={(position) => openJobPosition(position.id)}
                        />

                        <JobPositionEditModal
                            key={`${showAddJobPositionModal}-${editingJobPosition?.id ?? "new"}`}
                            show={showAddJobPositionModal}
                            departmentId={department.id}
                            position={editingJobPosition}
                            onClose={closeContactModal}
                            onSaved={onSaved}
                        />
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