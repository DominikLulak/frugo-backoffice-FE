import type {EventLog} from "../../../types/event.ts";
import type {TableColumn} from "../../../components/common/Table.tsx";
import DetailButton from "../../../components/common/buttons/DetailButton.tsx";

type Props = {
    onDetail: (eventLog: EventLog) => void;
}

export default function useEventLogTableColumns({onDetail}:Props):TableColumn<EventLog>[]{
    return [
        {
            key: "id",
            header: "ID eventu",
            render: (eventLog) => eventLog.id
        },
        {
            key: "eventCode",
            header: "Kod eventu",
            render: (eventLog) => eventLog.eventCode
        },
        {
            key: "createdAt",
            header: "Vytvoreno",
            render: (eventLog) => eventLog.createdAt
        },
        {
            key: "employeeName",
            header: "Jmeno uzivatele",
            render: (eventLog) => eventLog.employeeName ?? "SYSTEM"
        },
        {
            key: "description",
            header: "Popis",
            render: (eventLog) => eventLog.description
        },
        {
            key: "actions",
            header: "Akce",
            render: (eventLog) => (
                <div className="d-flex gap-2">
                    <DetailButton
                        onClick={() => onDetail(eventLog)}
                    />
                </div>
            )
        },
    ]
}