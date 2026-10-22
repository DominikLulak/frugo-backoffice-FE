import type {StockItemDetail} from "../../types/stock.ts";
import "../modal.css";
import useStockItemDetailSection from "../../hooks/stockItems/useStockItemDetailSection.ts";
import BaseModal from "../common/modal/BaseModal.tsx";
import KeyValueTable from "../common/KeyValueTable.tsx";

type Props = {
    stockItem: StockItemDetail;
    onClose: () => void;
};

export default function StockItemModal({stockItem, onClose}: Props){

    const sections = useStockItemDetailSection(stockItem);

    return(
        <>
            <BaseModal
                title={`Detail skladove polozky ${stockItem.etiNumber}`}
                onClose={onClose}>

                {sections.map((section) => (
                    <section key={section.title}>
                        <KeyValueTable rows={section.rows}/>
                    </section>
                ))}

            </BaseModal>
        </>
    )
}