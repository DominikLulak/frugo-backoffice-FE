import type {TableColumn} from "../../../components/common/Table.tsx";
import EditButton from "../../../components/common/buttons/EditButton.tsx";
import type {Packaging} from "../../../types/product.ts";

type Props = {
    onEdit: (packaging: Packaging) => void;
}

export default function usePackagingTableColumns({onEdit}:Props):TableColumn<Packaging>[]{
    return [
        {
            key: "code",
            header: "Kod baleni",
            render: (packaging) => packaging.code
        },
        {
            key: "name",
            header: "Nazev baleni",
            render: (packaging) => packaging.name
        },
        {
            key: "description",
            header: "Popis baleni",
            render: (packaging) => packaging.description
        },
        {
            key: "actions",
            header: "Akce",
            render: (packaging) => (
                <div className="d-flex gap-2">
                <EditButton
                    onClick={() => onEdit(packaging)}
    />
    </div>
)
},
]
}