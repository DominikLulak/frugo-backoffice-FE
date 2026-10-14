import type {Module} from "../../../../types/role.ts";
import type {TableColumn} from "../../../../components/common/Table.tsx";
import DetailButton from "../../../../components/common/buttons/DetailButton.tsx";
import EditButton from "../../../../components/common/buttons/EditButton.tsx";

type Props = {
    onDetail: (module: Module) => void;
    onEdit: (module: Module) => void;
}

export default function useModuleTableColumns({onDetail, onEdit}:Props):TableColumn<Module>[]{
    return [
        {
            key: "moduleCode",
            header: "Kod modulu",
            render: (module) => module.moduleCode
        },
        {
            key: "moduleName",
            header: "Jmeno modulu",
            render: (module) => module.moduleName
        },
        {
            key: "actions",
            header: "Akce",
            render: (module) => (
                <div className="d-flex gap-2">
                    <DetailButton
                        onClick={() => onDetail(module)}
                    />
                    <EditButton
                        onClick={() => onEdit(module)}
                    />
                </div>
            )
        }
    ]
}