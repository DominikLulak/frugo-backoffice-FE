import type {OrderItem} from "../../../types/order.ts";
import type {TableColumn} from "../../../components/common/Table.tsx";
import EditButton from "../../../components/common/buttons/EditButton.tsx";
import DeleteButton from "../../../components/common/buttons/DeleteButton.tsx";

export type OrderProductRow = {
    productId: number;
    categoryCode: string;
    productType: string;
    productName: string;
    quantity: number;
    pickedQuantity: number;
    items: OrderItem[]
}

type Props = {
    onEditProduct: (product: OrderProductRow) => void;
    onDeleteProduct: (product: OrderProductRow) => void;
    canManageItems: boolean
}

export function useOrderProducts(
    items: OrderItem[]
):OrderProductRow[]{
    const products = new Map<number, OrderProductRow>()

    items.forEach(item => {
        const existing = products.get(item.productId)

        if(existing){
            existing.quantity += item.quantity
            existing.pickedQuantity += item.pickedQuantity
            existing.items.push(item)
        }else{
            products.set(item.productId, {
                productId: item.productId,
                categoryCode: item.warehouseItemCategoryCode,
                productType: item.warehouseItemType,
                productName: item.warehouseItemName,
                quantity: item.quantity,
                pickedQuantity: item.pickedQuantity,
                items: [item]
            })
        }
    })

    return Array.from(products.values())
}

export default function useOrderModalTableColumns({
    onEditProduct, onDeleteProduct, canManageItems
}:Props){
    const productColumns: TableColumn<OrderProductRow>[] = [
        {
            key: "categoryCode",
            header: "Kategorie",
            render: product => product.categoryCode
        },
        {
            key: "productType",
            header: "Druh",
            render: product => product.productType
        },
        {
            key: "productName",
            header: "Produkt",
            render: product => product.productName
        },
        {
            key: "quantity",
            header: "Objednano (kg)",
            render: product => product.quantity
        },
        {
            key: "pickedQuantity",
            header: "Vyskladneno (kg)",
            render: product => product.pickedQuantity
        },
        {
            key: "actions",
            header: "Akce",
            render: product => (
                <div className="d-flex gap-2">
                    {canManageItems && (
                        <>
                            <EditButton
                                onClick={() => onEditProduct(product)}
                            />
                            <DeleteButton
                                onClick={() => onDeleteProduct(product)}
                            />
                        </>
                    )}
                </div>
            )
        },
    ]

    const warehouseItemColumns: TableColumn<OrderItem>[] = [
        {
            key: "etiNumber",
            header: "Cislo ETI",
            render: item => item.etiNumber
        },
        {
            key: "warehouseItemCategoryCode",
            header: "Kategorie",
            render: item => item.warehouseItemCategoryCode
        },
        {
            key: "warehouseItemType",
            header: "Druh",
            render: item => item.warehouseItemType
        },
        {
            key: "warehouseItemName",
            header: "Produkt",
            render: item => item.warehouseItemName
        },
        {
            key: "quantity",
            header: "Objednano (kg)",
            render: item => item.quantity
        },
        {
            key: "pickedQuantity",
            header: "Vyskladneno (kg)",
            render: item => item.pickedQuantity
        },
        {
            key: "statusCode",
            header: "Stav",
            render: item => item.statusCode
        },
    ]

    return{
        productColumns, warehouseItemColumns
    }
}