import "../modal.css"
import type {JobPositionDetail} from "../../types/department.ts";

type Props = {
    position: JobPositionDetail;
    onClose: () => void;
}

export default function JobPositionModal({
                                             position,
                                              onClose
                                          }:Props){
    return(
        <div
            className="modal-backdrop-custom modal-backdrop-custom-second"
            onClick={onClose}
        >
            <div
                className="modal-custom modal-custom-second"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content-custom">
                    <div className="modal-header">
                        <h5>Pracovni pozice {position.name}</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body">

                        <h6>Pracovni pozice</h6>

                        <table className="table table-sm">
                            <tbody>
                            <tr>
                                <th>Nazev oddeleni</th>
                                <td>{position.departmentName}</td>
                            </tr>
                            <tr>
                                <th>Kod pozice</th>
                                <td>{position.code}</td>
                            </tr>
                            <tr>
                                <th>Nazev pozice</th>
                                <td>{position.name}</td>
                            </tr>
                            <tr>
                                <th>Popis pozice</th>
                                <td>{position.description}</td>
                            </tr>
                            </tbody>
                        </table>

                        <h6 className="mt-4">Zamestnanci</h6>

                        {position.employees.length === 0 ? (
                            <p>Zadni zamestnanci</p>
                        ) : (
                            <table className="table table-sm">
                                <thead>
                                <tr>
                                    <th>Kod zamestnance</th>
                                    <th>Jmeno</th>
                                    <th>Kod smeny</th>
                                    <th>Nazev oddeleni</th>
                                    <th>Nazev pracovni pozice</th>
                                    <th>Aktivni zamestnanec</th>
                                </tr>
                                </thead>

                                <tbody>
                                {position.employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.employeeNumber}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.shiftCode}</td>
                                        <td>{employee.departmentName}</td>
                                        <td>{employee.jobPositionName}</td>
                                        <td>{employee.active ? "Ano" : "Ne"}</td>
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