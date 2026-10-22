import {useCallback, useEffect, useState} from "react";
import type {Product} from "../../types/product.ts";
import {getProducts} from "../../api/ProductApi.ts";

type UseProductsOptions = {
    enabled?: boolean
}

export default function useProducts({enabled = true}:UseProductsOptions = {}){
    const [products, setProducts] = useState<Product[]>([])
    const [loadingProducts, setLoadingProducts] = useState(false)
    const [loadProductsError, setLoadProductsError] = useState("")

    const fetchProducts = useCallback(async () => {
        try {
            setLoadingProducts(true)
            setLoadProductsError("")

            const data = await getProducts()
            setProducts(data)
        }catch{
            setLoadProductsError("Nepodarilo se nacist produkty")
        }finally {
            setLoadingProducts(false)
        }
    }, [])

    useEffect(() => {
        if(!enabled) return

        void fetchProducts()
    }, [enabled, fetchProducts]);

    return{
        products, loadingProducts, loadProductsError
    }
}