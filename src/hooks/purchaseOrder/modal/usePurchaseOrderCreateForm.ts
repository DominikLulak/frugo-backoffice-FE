import useProducts from "../../products/useProducts.ts";
import useSuppliers from "../supplier/useSuppliers.ts";
import useCountries from "../../useCountries.ts";
import {useState} from "react";
import type {PurchaseOrderCreateDto, PurchaseOrderItemCreateDto} from "../../../types/purchaseOrder.ts";
import {createPurchaseOrder} from "../../../api/PurchaseOrderApi.ts";

export type PurchaseOrderItemForm = {
    category: string;
    productType: string;
    productId: number | null;
    quantity: number;
    countryId: number | null;
};

const emptyItem = (): PurchaseOrderItemForm => ({
    category: "",
    productType: "",
    productId: null,
    quantity: 1,
    countryId: null
});

type UsePurchaseOrderCreateFormProps = {
    show: boolean;
    onSaved: () => void;
    onClose: () => void;
};

export default function usePurchaseOrderCreateForm({
    show, onClose, onSaved
}:UsePurchaseOrderCreateFormProps){
    const {products, loadingProducts, loadProductsError} = useProducts({enabled: show})
    const {suppliers, loadingSuppliers, suppliersError} = useSuppliers({active: true, enabled: show})
    const {countries, loadingCountries, countriesError} = useCountries({enabled: show})

    const [supplierId, setSupplierId] = useState<number | null>(null)
    const [items, setItems] = useState<PurchaseOrderItemForm[]>([
        emptyItem()
    ])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const categories = [
        ...new Set(products.map(product => product.categoryCode))
    ];

    const getProductTypes = (category: string) => {
        return[
            ...new Set(
                products
                    .filter(product => product.categoryCode === category)
                    .map(product => product.productType)
            )
        ]
    }

    const getProductsForItem = (
        category: string,
        productType: string
    )=> {
        return products.filter(
            product =>
                product.categoryCode === category &&
                product.productType === productType
        )
    }

    const updateItem = (
        index: number,
        changes: Partial<PurchaseOrderItemForm>
    ) => {
        setItems(prev =>
            prev.map((item, itemIndex) =>
                itemIndex === index
                    ? {...item, ...changes}
                    : item
            )
        )
    }

    const handleCategoryChange = (
        index: number,
        category: string
    )=> {
        updateItem(index, {
            category,
            productType: "",
            productId: null
        })
    }

    const handleProductTypeChange = (
        index: number,
        productType: string
    )=> {
        updateItem(index, {
            productType,
            productId: null
        })
    }

    const addItem = () => {
        setItems(prev => [...prev, emptyItem()])
    }

    const removeItem = (index: number) => {
        setItems(prev =>
            prev.filter((_, itemIndex) => itemIndex !== index)
        )
    }

    const handleSubmit = async () => {
        setError("")

        if(supplierId === null){
            setError("Vyberte dodavatele.")
            return
        }

        for(const item of items){
            if(
                !item.category ||
                !item.productType ||
                item.productId === null
            ){
                setError("Vyberte produkt u vsech polozek")
                return
            }

            if(item.quantity < 1){
                setError("Mnozstvi musi byt alespon 1")
                return
            }

            if(item.countryId === null){
                setError("Vyberte zemi puvodu u vsech polozek")
                return
            }
        }

        const dto: PurchaseOrderCreateDto = {
            supplierId,
            items: items.map(
                (item): PurchaseOrderItemCreateDto => ({
                    productId: item.productId!,
                    quantity: item.quantity,
                    countryId: item.countryId!
                })
            )
        }

        try {
            setLoading(true)

            await createPurchaseOrder(dto)

            onSaved()
            onClose()

            setSupplierId(null)
            setItems([emptyItem()])
        }catch {
            setError("Nepodarilo se vytvorit nakupni objednavku")
        }finally {
            setLoading(false)
        }
    }

    return{
        suppliers, countries, products,
        supplierId, setSupplierId, items,
        categories, getProductTypes, getProductsForItem,
        updateItem, handleCategoryChange, handleProductTypeChange, addItem, removeItem, handleSubmit,
        loading, error, setError,
        loadingProducts, loadProductsError, loadingSuppliers, suppliersError, loadingCountries, countriesError
    }
}