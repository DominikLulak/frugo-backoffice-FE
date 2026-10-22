import type {EventLog} from "../../../types/event.ts";
import EventLogModal from "../../../components/event/EventLogModal.tsx";
import useEventLogList from "../../../hooks/event/eventLog/useEventLogList.ts";
import useEventLogTableColumns from "../../../hooks/event/eventLog/useEventLogTableColumns.tsx";
import useEventLogModal from "../../../hooks/event/eventLog/useEventLogModal.ts";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Table from "../../../components/common/Table.tsx";

export default function EventLogPage(){

    const {eventLogs, loading, loadError} = useEventLogList()
    const {selectedEventLog, openDetail, closeDetail} = useEventLogModal()

    const columns = useEventLogTableColumns({
        onDetail: openDetail
    })

    return(
        <div className="container-fluid">
            <PageHeader
                title="Event Log"
            />

            <Table<EventLog>
                columns={columns}
                data={eventLogs}
                getRowKey={(eventLog) => eventLog.id}
                loading={loading}
                error={loadError}
                loadingText="Nacitam event logy..."
                emptyMessage="Nebyly nalezeny zadne event logy"
            />


            {selectedEventLog && (
                <EventLogModal
                    eventLog={selectedEventLog}
                    onClose={closeDetail}
                />
            )}
        </div>
    )
}