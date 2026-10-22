import type {EventLogDetail} from "../../types/event.ts";
import useEventLogSection from "../../hooks/event/eventLog/useEventLogSection.ts";
import BaseModal from "../common/modal/BaseModal.tsx";
import KeyValueTable from "../common/KeyValueTable.tsx";

type Props = {
    eventLog: EventLogDetail;
    onClose: () => void;
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