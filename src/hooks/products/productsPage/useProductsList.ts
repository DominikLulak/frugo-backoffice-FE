import useProducts from "../useProducts.ts";
import {useState} from "react";
import type {Product} from "../../../types/product.ts";
import {getProducts, setProductForSale} from "../../../api/ProductApi.ts";

export type ProductFilterState = {
    category: string;
    productType: string;
    productCode: string;
}

const initialFilters: ProductFilterState = {
    category: "",
    productType: "",
    productCode: "",
}

export default function useProductsList(){

    const {products, setProducts, loadingProducts, loadProductsError, fetchProducts: fetchAllProducts
    } = useProducts();

    const [filters, setFilters] = useState<ProductFilterState>(initialFilters)

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [showEditModal, setShowEditModal] = useState(false)

    const [filterLoading, setFilterLoading] = useState(false)
    const [filterError, setFilterError] = useState("")

    const [actionLoading, setActionLoading] = useState(false)
    const [actionError, setActionError] = useState("")

    const updateFilters = <K extends keyof ProductFilterState>(
        key: K,
        value: ProductFilterState[K]
    ) => {
        setFilters(previous => ({
            ...previous,
            [key]: value
        }))
    }

    const fetchProducts = async (
        applyFilters = false,
        filterValues: ProductFilterState = filters
    ) => {
        try{
            setFilterLoading(true)
            setFilterError("")

            if(!applyFilters){
                await fetchAllProducts();
                return
            }

            const data = await getProducts(
                filterValues.category,
                filterValues.productType,
                filterValues.productCode,
            )

            setProducts(data)
        }catch{
            setFilterError("Nepodarilo se nacist filtrovane produktry")
        }finally {
            setFilterLoading(false)
        }
    }

    const openCreate = () => {
        setSelectedProduct(null)
        setShowEditModal(true)
    }

    const openEdit = (product: Product) => {
        setSelectedProduct(product)
        setShowEditModal(true)
    }

    const closeEdit = () => {
        setShowEditModal(false)
        setSelectedProduct(null)
    }

    const handleToggleSale = async (product: Product) => {
        try {
            setActionLoading(true)
            setActionError("")

            await setProductForSale(product.id, !product.forSale)
            await fetchProducts(true, filters)
        }catch{
            setActionError("Nepodarilo se zmenit prodejni stav produktu")
        }finally {
            setActionLoading(false)
        }
    }

    return{
        products,
        filters,
        updateFilters,
        fetchProducts,
        loading: loadingProducts || filterLoading,
        loadError: loadProductsError || filterError,
        selectedProduct,
        showEditModal,
        actionLoading,
        actionError,
        setActionError,
        openCreate, openEdit, closeEdit,
        handleToggleSale
    }
}