import type {Category, Product, ProductCreateDto, ProductType} from "../../../../types/product.ts";
import {useEffect, useState} from "react";
import useProductFormValidation, {type ProductFormErrors} from "./useProductFormValidation.ts";
import useProductFormSubmit from "./useProductFormSubmit.ts";
import {getCategories} from "../../../../api/CategoryApi.ts";
import {getProductTypes} from "../../../../api/ProductTypeApi.ts";

type Props = {
    product: Product | null;
    show: boolean;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function useProductEditForm({
    product, onClose, onSaved, show
}:Props){
    const [categories, setCategories] = useState<Category[]>([])
    const [productTypes, setProductTypes] = useState<ProductType[]>([])

    const [categoryId, setCategoryId] = useState<number | "">(product?.categoryId ?? "");
    const [productTypeName, setProductTypeName] = useState(product?.productType ?? "");
    const [productCode, setProductCode] = useState(product?.productCode ?? "");
    const [name, setName] = useState(product?.productName ?? "");
    const [pricePerUnit, setPricePerUnit] = useState<number | "">(product?.pricePerUnit ?? "");
    const [shelfLifeDays, setShelfLifeDays] = useState<number | "">(product?.shelfLifeDays ?? "");
    const [reorderPoint, setReorderPoint] = useState<number | "">(product?.reorderPoint ?? "");
    const [minimumStock, setMinimumStock] = useState<number | "">(product?.minimumStock ?? "");

    const [errors, setErrors] = useState<ProductFormErrors>({})
    const [loadingCategories, setLoadingCategories] = useState(false)
    const [loadingProductTypes, setLoadingProductTypes] = useState(false)
    const [loadError, setLoadError] = useState("")

    const isEditing = product !== null

    const {validateForm} = useProductFormValidation({
        categoryId, shelfLifeDays, pricePerUnit, name, reorderPoint, productCode,
        minimumStock, productTypeName,
    })

    const {saving, saveError, handleSubmit} = useProductFormSubmit({
        productId: product?.id ?? 0,
        isEditing, onClose, onSaved
    })

    useEffect(() => {
        if(!show) return

        const fetchCategories = async () => {
            try {
                setLoadingCategories(true)
                setLoadError("")

                const data = await getCategories()
                setCategories(data)
            }catch{
                setLoadError("Nepodarilo se nacist kategorie")
            }finally {
                setLoadingCategories(false)
            }
        }

        void fetchCategories()
    }, [show]);

    useEffect(() => {
        if(!show || categoryId === ""){
            setProductTypes([])
            return
        }

        const fetchProductTypes = async () => {
            try {
                setLoadingProductTypes(true)
                setLoadError("")

                const data = await getProductTypes(categoryId)
                setProductTypes(data)
            }catch{
                setLoadError("Nepodarilo se nacist druhy produktu")
            }finally {
                setLoadingProductTypes(false)
            }
        }

        void fetchProductTypes()
    }, [show, categoryId]);

    const handleCategoryChange = (value: number | "") => {
        setCategoryId(value)
        setProductTypeName("")
        setProductTypes([])
        setErrors(previous => ({
            ...previous,
            categoryId: "",
            productTypeName: ""
        }))
    }

    const handleSave = async () => {
        const validationErrors = validateForm()

        setErrors(validationErrors)

        if(Object.keys(validationErrors).length > 0){
            return
        }

        const productData: ProductCreateDto = {
            categoryId: Number(categoryId),
            productTypeName: productTypeName.trim(),
            productCode: productCode.trim(),
            name: name.trim(),
            pricePerUnit: Number(pricePerUnit),
            shelfLifeDays: Number(shelfLifeDays),
            reorderPoint: Number(reorderPoint),
            minimumStock: Number(minimumStock)
        }

        await handleSubmit(productData)
    }

    return{
        categories, productTypes,
        categoryId, setCategoryId: handleCategoryChange, productTypeName, setProductTypeName,
        productCode, setProductCode, name, setName, pricePerUnit, setPricePerUnit,
        shelfLifeDays, setShelfLifeDays, reorderPoint, setReorderPoint, minimumStock, setMinimumStock,
        loadingCategories, loadingProductTypes, loadError,
        saving, errors, saveError, isEditing, handleSave

    }
}