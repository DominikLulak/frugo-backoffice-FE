import type {EventLogDetail} from "../../types/event.ts";

type Props = {
    eventLog: EventLogDetail;
    onClose: () => void;
}

export default function EventLogModal({
    eventLog,
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
                        <h5>Detail event logu</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body">
                        <h6>Zakladni informace</h6>
                        <table className="table table-sm">
                            <tbody>
                            <tr>
                                <th>ID</th>
                                <td>{eventLog.id}</td>
                            </tr>
                            <tr>
                                <th>Datum a cas</th>
                                <td>{eventLog.createdAt}</td>
                            </tr>
                            <tr>
                                <th>Kod udalosti</th>
                                <td>{eventLog.eventCode}</td>
                            </tr>
                            <tr>
                                <th>Nazev udalost</th>
                                <td>{eventLog.eventName}</td>
                            </tr>
                            </tbody>
                        </table>

                        <h6 className="mt-4">Popis udalosti</h6>
                        <table className="table table-sm">
                            <tbody>
                            <tr>
                                <th>{eventLog.description}</th>
                            </tr>
                            </tbody>
                        </table>

                        <h6 className="mt-4">Zamestnanec</h6>
                        <table>
                            <tbody>
                            <tr>
                                <th>Cislo zamestnance</th>
                                <td>{eventLog.employeeNumber ?? "$0$"}</td>
                            </tr>
                            <tr>
                                <th>Jmeno zamestnance</th>
                                <td>{eventLog.employeeName ?? "SYSTEM"}</td>
                            </tr>
                            </tbody>
                        </table>

                        <h6 className="mt-4">Informace o udalosti</h6>
                        <table className="table table-sm">
                            <tbody>
                            <tr>
                                <th>Udalosti</th>
                                <td>{eventLog.eventDescription}</td>
                            </tr>
                            <tr>
                                <th>Souvisejici entity</th>
                                <td>
                                    {eventLog.entities.length > 0 ? (
                                        <ul className="mb-0">
                                            {eventLog.entities.map((entity, index) => (
                                                <li key={index}>
                                                    {entity.entityType} - ID {entity.entityId}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        "-"
                                    )}
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <h6 className="mt-4">Data udalosti</h6>
                        <pre
                            className="bg-light border rounded p-3"
                            style={{
                                maxHeight: "250px",
                                overflow: "auto",
                                fontSize: "0.85rem"
                            }}
                        >
                            {eventLog.data
                                ?JSON.stringify(eventLog.data, null, 2)
                                : "-"
                            }
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}