import {useEffect, useState} from "react";
import type {EventLog, EventLogDetail} from "../../../types/event.ts";
import {getEventLogDetail, getEventLogs} from "../../../api/EventLogApi.ts";
import EventLogModal from "../../../components/event/EventLogModal.tsx";

export default function EventLogPage(){
    const [eventLogs, setEventLogs] = useState<EventLog[]>([])
    const [selectedEventLog, setSelectedEventLog] = useState<EventLogDetail | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEventLogs()
            setEventLogs(data)
        }
        fetchData()
    }, []);

    const openEventLog = async (eventLog: EventLog) => {
        const data = await getEventLogDetail(eventLog.id)
        setSelectedEventLog(data)
    }

    return(
        <div className="container-fluid">
            <h1>Event Log</h1>

            <table className="table">
                <thead>
                <tr>
                    <th>ID eventu</th>
                    <th>Kod eventu</th>
                    <th>Vytvoreno</th>
                    <th>Jmeno uzivatele</th>
                    <th>Popis</th>
                </tr>
                </thead>

                <tbody>
                {eventLogs.map(eventLog => (
                    <tr key={eventLog.id}>
                        <td>
                            <button
                                className="btn btn-link p-0"
                                onClick={() => openEventLog(eventLog)}
                            >
                                {eventLog.id}
                            </button>
                        </td>
                        <td>{eventLog.eventCode}</td>
                        <td>{eventLog.createdAt}</td>
                        <td>{eventLog.employeeName ?? "SYSTEM"}</td>
                        <td>{eventLog.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedEventLog && (
                <EventLogModal
                    eventLog={selectedEventLog}
                    onClose={() => setSelectedEventLog(null)}
                />
            )}
        </div>
    )
}