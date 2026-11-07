export type ProductFormErrors = {
    [key: string]: string;
}

type Props = {
    categoryId: number | "";
    productTypeName: string;
    productCode: string;
    name: string;
    pricePerUnit: number | "";
    shelfLifeDays: number | "";
    reorderPoint: number | "";
    minimumStock: number | "";
}

export default function useProductFormValidation({
    categoryId, productCode, productTypeName, name,
    pricePerUnit, shelfLifeDays, reorderPoint, minimumStock
}:Props){
    const validateForm = ():ProductFormErrors => {
        const errors: ProductFormErrors = {};

        const requiredFields = [
            {key: "categoryId", value: categoryId, label: "Kategorie"},
            {key: "productTypeName", value: productTypeName, label: "Typ produktu"},
            {key: "productCode", value: productCode, label: "Kod produktu"},
            {key: "name", value: name, label: "Nazev produktu"},
            {key: "pricePerUnit", value: pricePerUnit, label: "Cena za kg"},
            {key: "shelfLifeDays", value: shelfLifeDays, label: "Trvanlivost"},
            {key: "reorderPoint", value: reorderPoint, label: "Bod objednani"},
            {key: "minimumStock", value: minimumStock, label: "Minimalni zasoba"},
        ]

        for(const field of requiredFields){
            const isEmpty =
                field.value === "" ||
                (typeof field.value === "string" && field.value.trim() === "")

            if(isEmpty){
                errors[field.key] = `${field.label} musi byt vyplneno`
            }
        }

        if(pricePerUnit !== "" && pricePerUnit <= 0){
            errors.pricePerUnit = "Cena musi byt vetsi nez 0"
        }
        if(shelfLifeDays !== "" && shelfLifeDays <= 0){
            errors.shelfLifeDays = "Trvanlivost musi byt vetsi nez 0"
        }
        if(reorderPoint !== "" && reorderPoint < 0){
            errors.reorderPoint = "Bod objednani nemuze byt zaporny"
        }
        if(minimumStock !== "" && minimumStock < 0){
            errors.minimumStock = "Minimalni zasoba nemuze byt zaporna"
        }

        return errors
    }

    return {validateForm}
}