import type {PalletDetail, PalletWarehouseItem} from "../../types/pallet.ts";
import BaseModal from "../common/modal/BaseModal.tsx";
import usePalletDetailColumns from "../../hooks/pallets/modal/usePalletDetailColumns.ts";
import usePalletSection from "../../hooks/pallets/modal/usePalletSection.ts";
import KeyValueTable from "../common/KeyValueTable.tsx";
import Table from "../common/Table.tsx";

type Props = {
    pallet: PalletDetail;
    onClose: () => void;
}

export default function PalletModal({
    pallet,
    onClose
}:Props){

    const sections = usePalletSection(pallet)
    const columns = usePalletDetailColumns()

    return(
        <>
            <BaseModal
                title={`Detail palety ${pallet.palletNumber}`}
                onClose={onClose}
            >

                {sections.map((section) => (
                    <section key={section.title}>
                        <KeyValueTable rows={section.rows}/>
                    </section>
                ))}

                <Table<PalletWarehouseItem>
                    columns={columns}
                    data={pallet.items}
                    getRowKey={(item) => item.etiNumber}
                />
            </BaseModal>
        </>
    )
}