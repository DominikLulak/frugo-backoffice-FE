import type {Shift} from "../../../types/referenceData.ts";
import type {TableColumn} from "../../../components/common/Table.tsx";
import EditButton from "../../../components/common/buttons/EditButton.tsx";

type Props = {
    onEdit: (shift: Shift) => void;
}

export default function useShiftTableColumns({onEdit}:Props):TableColumn<Shift>[]{
    return [
        {
            key: "code",
            header: "Kod smeny",
            render: (shift) => shift.code
        },
        {
            key: "description",
            header: "Popis smeny",
            render: (shift) => shift.description
        },
        {
            key: "actions",
            header: "Akce",
            render: (shift) => (
                <div className="d-flex gap-2">
                    <EditButton
                        onClick={() => onEdit(shift)}
                    />
                </div>
            )
        },
    ]
}