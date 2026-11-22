import type {EventLogDetail} from "../../types/event.ts";
import useEventLogSection from "../../hooks/event/eventLog/useEventLogSection.ts";
import BaseModal from "../common/modal/BaseModal.tsx";
import KeyValueTable from "../common/KeyValueTable.tsx";

type Props = {
    eventLog: EventLogDetail;
    onClose: () => void;
}

function getStatusClass(status: string): string{
    switch (status){
        case "SUCCESS":
            return "bg-success";
        case "PARTIAL_SUCCESS":
            return "bg-warning text-dark";
        case "FAILED":
            return "bg-danger";
        case "IN_PROGRESS":
            return "bg-primary";
        default:
            return "bg-secondary";
    }
}

export default function EventLogModal({
    eventLog,
    onClose
}:Props){
    const sections = useEventLogSection(eventLog)

    return(
        <BaseModal
            title={`Detail vent logu ${eventLog.id}`}
            onClose={onClose}
        >
            {sections.map((section) => (
                <section key={section.title} className="mb-4">
                    <KeyValueTable rows={section.rows}/>
                </section>
            ))}

            <section className="mb-4">
                <h6>Souvisejici entity</h6>

                {eventLog.entities.length === 0 ? (
                    <p className="text-muted mb-0">
                        Zadne souvisejici entity
                    </p>
                ):(
                    <ul className="mb-0">
                        {eventLog.entities.map((entity, index) => (
                            <li
                                key={`${entity.entityType}-${entity.entityId}-${index}`}
                            >
                                {entity.entityType} - ID {entity.entityId}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section className="mb-4">
                <h6>Prubeh udalosti</h6>

                {eventLog.steps.length === 0 ? (
                    <p className="text-muted mb-0">
                        Udalost neobsahuje zadne kroky
                    </p>
                ) : (
                    <div className="d-flex flex-column gap-3">
                        {eventLog.steps.map((step) => (
                            <div
                                key={step.id}
                                className="border rounded p-3"
                            >
                                <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                                    <div>
                                        <strong>
                                            {step.stepNumber}. {step.description}
                                        </strong>
                                        <div className="text-muted small">
                                            {step.name}
                                        </div>
                                    </div>

                                    <span className={`badge ${getStatusClass(step.status)}`}>
                                        {step.status}
                                    </span>
                                </div>

                                <div className="small text-muted">
                                    Zahajeno: {step.createdAt}
                                </div>

                                {step.finishedAt && (
                                    <div className="small text-muted">
                                        Dokonceno: {step.finishedAt}
                                    </div>
                                )}

                                {step.errorCode && (
                                    <div className="mt-3">
                                        <div className="text-danger fw-bold">
                                            {step.errorCode}
                                        </div>

                                        <div className="text-danger">
                                            {step.errorMessage}
                                        </div>
                                    </div>
                                )}

                                {step.data && (
                                    <details className="mt-3">
                                        <summary className="small">
                                            Data krouku
                                        </summary>

                                        <pre className="bg-light border rounded p-2 mt-2 mb-0">
                                            {JSON.stringify(step.data, null, 2)}
                                        </pre>
                                    </details>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section>
                <h6>Data udalosti</h6>
                <pre
                    className="bg-light border rounded p-3 mb-0"
                    style={{
                        maxHeight: "250px",
                        overflow: "auto",
                        fontSize: "0.85rem"
                    }}
                >
                    {eventLog.data
                        ? JSON.stringify(eventLog.data, null, 2)
                        : "-"
                    }
                </pre>
            </section>
        </BaseModal>
    )
}