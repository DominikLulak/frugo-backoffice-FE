import type {Product} from "../../../types/product.ts";
import type {TableColumn} from "../../../components/common/Table.tsx";
import EditButton from "../../../components/common/buttons/EditButton.tsx";
import StatusButton from "../../../components/common/buttons/StatusButton.tsx";

type Props = {
    onEdit: (product: Product) => void;
    onToggleSale: (product: Product) => void;
    getStockStatusLabel: (product: Product) => string;
}

export default function useProductTableColumns({
    onEdit, onToggleSale, getStockStatusLabel
}:Props):TableColumn<Product>[]{
    return [
        {
            key: "productCode",
            header: "Kod produktu",
            render: (product) => product.productCode
        },
        {
            key: "categoryCode",
            header: "Kategorie",
            render: (product) => product.categoryCode
        },
        {
            key: "productType",
            header: "Typ produktu",
            render: (product) => product.productType
        },
        {
            key: "productName",
            header: "Nazev produktu",
            render: (product) => product.productName
        },
        {
            key: "pricePerUnit",
            header: "Cena za kg",
            render: (product) => product.pricePerUnit
        },
        {
            key: "shelfLifeDays",
            header: "Trvanlivost (dny)",
            render: (product) => product.shelfLifeDays
        },
        {
            key: "forSale",
            header: "V prodeji",
            render: (product) => product.forSale ? "Ano" : "Ne"
        },
        {
            key: "availableStock",
            header: "Na sklade",
            render: (product) => `${product.availableStock} kg`
        },
        {
            key: "stockStatus",
            header: "Stav skladu",
            render: (product) => getStockStatusLabel(product)
        },
        {
            key: "actions",
            header: "Akce",
            render: (product) => (
                <div className="d-flex gap-2">
                    <EditButton
                        onClick={() => onEdit(product)}
                    />
                    <StatusButton
                        active={product.forSale}
                        onClick={() => onToggleSale(product)}
                    />
                </div>
            )
        }
    ]
}