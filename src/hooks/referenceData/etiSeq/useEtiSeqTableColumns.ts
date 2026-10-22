import type {TableColumn} from "../../../components/common/Table.tsx";
import type {EtiSequence} from "../../../types/etiSequence.ts";

export default function useEtiSeqTableColumns():TableColumn<EtiSequence>[]{
    return [
        {
            key: "code",
            header: "Kod",
            render: (sequence) => sequence.code
        },
        {
            key: "description",
            header: "Popis",
            render: (sequence) => sequence.description
        },
        {
            key: "lastNumber",
            header: "Posledni cislo sekvence",
            render: (sequence) => sequence.lastNumber
        }
    ]
}