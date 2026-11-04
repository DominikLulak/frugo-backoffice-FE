import type {Country} from "../../../types/referenceData.ts";
import type {TableColumn} from "../../../components/common/Table.tsx";
import EditButton from "../../../components/common/buttons/EditButton.tsx";

type Props = {
    onEdit: (country: Country) => void;
}

export default function useCountryTableColumns({onEdit}:Props):TableColumn<Country>[]{
    return [
        {
            key: "code",
            header: "Kod zeme",
            render: (country) => country.code
        },
        {
            key: "name",
            header: "Nazev zeme",
            render: (country) => country.name
        },
        {
            key: "actions",
            header: "Akce",
            render: (country) => (
                <div className="d-flex gap-2">
                    <EditButton
                        onClick={() => onEdit(country)}
                    />
                </div>
            )
        },
    ]
}

