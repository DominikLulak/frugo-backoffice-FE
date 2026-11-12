import type {KeyValueRow} from "../../../components/common/KeyValueTable.tsx";
import type {EventLogDetail} from "../../../types/event.ts";

export type EventLogSection = {
    title: string;
    rows: KeyValueRow[]
}

export default function useEventLogSection(
    eventLog: EventLogDetail
):EventLogSection[]{
    return [
        {
            title: "Zakladni informace",
            rows: [
                {label: "ID", value: eventLog.id},
                {label: "Datum a cas", value: eventLog.createdAt},
                {label: "Kod udalosti", value: eventLog.eventCode},
                {label: "Nazev udalosti", value: eventLog.eventName}
            ]
        },
        {
            title: "Popis udalosti",
            rows: [
                {label: "Popis", value: eventLog.description},
                {label: "Udalost", value: eventLog.eventDescription}
            ]
        },
        {
            title: "Zamestnanec",
            rows: [
                {label: "Cislo zamestnance", value: eventLog.employeeNumber ?? "$0$"},
                {label: "Jmeno zamestnance", value: eventLog.employeeName ?? "SYSTEM"},
            ]
        },
    ]
}