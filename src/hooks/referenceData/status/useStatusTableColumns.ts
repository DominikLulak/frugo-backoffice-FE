import type {TableColumn} from "../../../components/common/Table.tsx";
import type {Status} from "../../../types/referenceData.ts";

export default function useStatusTableColumns():TableColumn<Status>[]{
    return [
        {
            key: "code",
            header: "Kod statusu",
            render: (status) => status.code
        },
        {
            key: "name",
            header: "Nazev statusu",
            render: (status) => status.name
        },
        {
            key: "description",
            header: "Popis statusu",
            render: (status) => status.description
        }
    ]
}