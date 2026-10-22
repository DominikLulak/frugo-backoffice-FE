import type {StockItem} from "../../types/stock.ts";
import type {TableColumn} from "../../components/common/Table.tsx";
import DetailButton from "../../components/common/buttons/DetailButton.tsx";

type Props = {
    onDetail: (stockItem: StockItem) => void;
}

export default function useStockItemColumns({onDetail}:Props):TableColumn<StockItem>[]{
    return[
        {
            key: "categoryCode",
            header: "Kategorie",
            render: (stockItem) => stockItem.categoryCode
        },
        {
            key: "productType",
            header: "Typ",
            render: (stockItem) => stockItem.productType
        },
        {
            key: "productName",
            header: "Nazev",
            render: (stockItem) => stockItem.productName
        },
        {
            key: "productCode",
            header: "Kod produktu",
            render: (stockItem) => stockItem.productCode
        },
        {
            key: "palletNumber",
            header: "Cislo nadrazene palety",
            render: (stockItem) => stockItem.palletNumber ?? "-"
        },
        {
            key: "etiNumber",
            header: "ETI Cislo",
            render: (stockItem) => stockItem.etiNumber
        },
        {
            key: "quantity",
            header: "Mnozstvi",
            render: (stockItem) => stockItem.quantity + " kg"
        },
        {
            key: "allocatedQuantity",
            header: "Rezervovano",
            render: (stockItem) => stockItem.allocatedQuantity + " kg"
        },
        {
            key: "availableQuantity",
            header: "Volne",
            render: (stockItem) => stockItem.availableQuantity + " kg"
        },
        {
            key: "expirationDate",
            header: "Expirace",
            render: (stockItem) => stockItem.expirationDate
        },
        {
            key: "warehouseCode",
            header: "Sklad",
            render: (stockItem) => stockItem.warehouseCode
        },
        {
            key: "locationCode",
            header: "Lokace",
            render: (stockItem) => stockItem.locationCode
        },
        {
            key: "actions",
            header: "Akce",
            render: (stockItem) => (
                <div className="d-flex gap-2">
                    <DetailButton
                        onClick={() => onDetail(stockItem)}
                    />
                </div>
            )
        },
    ]
}