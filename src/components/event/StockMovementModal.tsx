import type {StockMovementDetail} from "../../types/event.ts";
import useStockMovementDateSection from "../../hooks/event/stockMovement/detail/useStockMovementDateSection.ts";
import useStockMovementEventColumn from "../../hooks/event/stockMovement/detail/useStockMovementEventColumn.ts";
import useStockMovementItemColumns from "../../hooks/event/stockMovement/detail/useStockMovementItemColumns.ts";
import useStockMovementMovementColumns from "../../hooks/event/stockMovement/detail/useStockMovementMovementColumns.ts";
import useStockMovementAdditionalLogsSection
    from "../../hooks/event/stockMovement/detail/useStockMovementAdditionalLogsSection.ts";
import BaseModal from "../common/modal/BaseModal.tsx";
import KeyValueTable from "../common/KeyValueTable.tsx";
import Table from "../common/Table.tsx";

type Props = {
    stockMovement: StockMovementDetail;
    onClose: () => void;
}

export default function StockMovementModal({
    stockMovement,
    onClose
}:Props){
    const dateSections = useStockMovementDateSection(stockMovement);
    const eventColumns = useStockMovementEventColumn();
    const itemColumns = useStockMovementItemColumns();
    const movementColumns = useStockMovementMovementColumns();
    const additionalSections = useStockMovementAdditionalLogsSection(stockMovement);

    return(
        <>
            <BaseModal
                title={`Detail skladoveho pohyb`}
                onClose={onClose}
            >
                {dateSections.map((section) => (
                    <section key={section.title}>
                        <KeyValueTable rows={section.rows}/>
                    </section>
                ))}

                <h6 className="mt-4">Udalost</h6>
                <Table<StockMovementDetail>
                    columns={eventColumns}
                    data={[stockMovement]}
                    getRowKey={(item) => item.eventCode}
                />

                <h6 className="mt-4">Skladova polozka</h6>
                <Table<StockMovementDetail>
                    columns={itemColumns}
                    data={[stockMovement]}
                    getRowKey={(item) => item.etiNumber}
                />

                <h6 className="mt-4">Pohyb</h6>
                <Table<StockMovementDetail>
                    columns={movementColumns}
                    data={[stockMovement]}
                    getRowKey={(item) => item.fromLocation}
                />

                {additionalSections.map((section) => (
                    <section key={section.title}>
                        <KeyValueTable rows={section.rows}/>
                    </section>
                ))}
            </BaseModal>
        </>
    )
}