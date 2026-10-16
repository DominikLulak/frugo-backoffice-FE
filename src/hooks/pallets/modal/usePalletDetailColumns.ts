import type {TableColumn} from "../../../components/common/Table.tsx";
import type {PalletWarehouseItem} from "../../../types/pallet.ts";

export default function usePalletDetailColumns():TableColumn<PalletWarehouseItem>[]{
    return [
        {
            key: "productCode",
            header: "Kod produktu",
            render: (item) => item.productCode
        },
        {
            key: "categoryCode",
            header: "Kod kategorie",
            render: (item) => item.categoryCode
        },
        {
            key: "productType",
            header: "Typ produktu",
            render: (item) => item.productType
        },
        {
            key: "productName",
            header: "Nazev produktu",
            render: (item) => item.productName
        },
        {
            key: "etiNumber",
            header: "ETI cislo",
            render: (item) => item.etiNumber
        },
        {
            key: "quantity",
            header: "Mnozstvi",
            render: (item) => item.quantity
        },
    ]
}