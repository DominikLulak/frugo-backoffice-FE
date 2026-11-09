import type {Product} from "../../../types/product.ts";
import {useEffect, useState} from "react";
import type {Customer} from "../../../types/customer.ts";
import {getCustomers} from "../../../api/CustomerApi.ts";
import type {OrderCreateDto, OrderItemCreateDto} from "../../../types/order.ts";
import {createOrder} from "../../../api/OrdersApi.ts";

type OrderFormItem = {
    category: string;
    productType: string;
    productId: number | null;
    quantity: number
}

type Props = {
    show: boolean
    products: Product[]
    onClose: () => void;
    onSaved: () => void | Promise<void>
}

const emptyItem = (): OrderFormItem => ({
    category: "",
    productType: "",
    productId: null,
    quantity: 1
})

export default function useOrderCreateForm({
    show, onClose, onSaved, products
}:Props){
    const [customers, setCustomers] = useState<Customer[]>([])
    const [customerId, setCustomerId] = useState<number | null>(null)
    const [items, setItems] = useState<OrderFormItem[]>([emptyItem()])

    const [loadingCustomers, setLoadingCustomers] = useState(false)
    const [customerError, setCustomerError] = useState("")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if(!show){
            setCustomerId(null)
            setItems([emptyItem()])
            setError("")
            setCustomerError("")
            return
        }

        const fetchCustomers = async () => {
            try {
                setLoadingCustomers(true)
                setCustomerError("")

                const data = await getCustomers()
                setCustomers(data)
            }catch{
                setCustomerError("Nepodarilo se nacist zakazniky")
            }finally {
                setLoadingCustomers(false)
            }
        }

        void fetchCustomers()
    }, [show]);

    const categories = [
        ...new Set(products.map(product => product.categoryCode))
    ]

    const getProductTypes = (category: string) => [
        ...new Set(
            products
                .filter(product => product.categoryCode === category)
                .map(product => product.productType),
        ),
    ]

    const getProductsForItem = (category: string, productType: string) =>
        products.filter(
            product =>
                product.categoryCode === category &&
                product.productType === productType,
        )

    const updateItem = (index: number, changes: Partial<OrderFormItem>) => {
        setItems(previous =>
            previous.map((item, itemIndex) =>
                itemIndex === index ? {...item, ...changes} : item,
            ),
        )
    }

    const handleCategoryChange = (index: number, category: string) => {
        updateItem(index, {
            category,
            productType: "",
            productId: null
        })
    }

    const handleProductTypeChange = (index: number, productType: string) => {
        updateItem(index, {
            productType,
            productId: null
        })
    }

    const addItem = () => {
        setItems(previous => [...previous, emptyItem()])
    }

    const removeItem = (index: number) => {
        setItems(previous => previous.filter((_, itemIndex) => itemIndex !== index))
    }

    const handleSubmit = async () => {
        setError("")

        if(customerId === null){
            setError("Vyberte zakaznika")
            return
        }

        if(items.length === 0){
            setError("Objednavka musi obsahovat alespon jeden produkt")
            return
        }

        const invalidItem = items.find(
            item =>
                item.productId === null ||
                !Number.isInteger(item.quantity) ||
                item.quantity < 1,
        )

        if(invalidItem){
            setError("Vyberte produkt a zadejte platne mnozstvi")
            return
        }

        const orderItems: OrderItemCreateDto[] = items.map(item => ({
            productId: item.productId!,
            quantity: item.quantity,
        }))

        const dto: OrderCreateDto = {
            customerId,
            items: orderItems
        }

        try{
            setLoading(true)
            await createOrder(dto)
            await onSaved()
            onClose()
        }catch{
            setError("Nepodarilo se vytvorit objednavku")
        }finally {
            setLoading(false)
        }
    }

    return{
        customers, customerId, setCustomerId, items,
        categories, getProductTypes, getProductsForItem,
        loadingCustomers, customerError, loading, error,
        updateItem, handleCategoryChange, handleProductTypeChange, addItem, removeItem, handleSubmit
    }
}