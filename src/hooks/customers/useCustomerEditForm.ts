import type {CustomerDetail} from "../../types/customer.ts";
import {useState} from "react";
import useCountries from "../useCountries.ts";
import {createCustomer, updateCustomer} from "../../api/CustomerApi.ts";

type Props = {
    customerId: number;
    customerDetail: CustomerDetail | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function useCustomerEditForm({
    customerId,
    customerDetail,
    onClose,
    onSaved
}:Props){
    const {
        countries,
        loadingCountries,
        countriesError
    } = useCountries()

    const [name, setName] = useState(customerDetail?.name ?? "")
    const [companyId, setCompanyId] = useState(customerDetail?.companyId ?? null)
    const [countryId, setCountryId] = useState<number | "">(customerDetail?.countryId ?? "")
    const [city, setCity] = useState(customerDetail?.city ?? "")
    const [postalCode, setPostalCode] = useState(customerDetail?.postalCode ?? "")
    const [street, setStreet] = useState(customerDetail?.street ?? "")
    const [houseNumber, setHouseNumber] = useState(customerDetail?.houseNumber ?? "")

    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    const isEditing = customerDetail !== null

    const handleSave = async () => {
        setError("")

        if(!name.trim()){
            setError("Nazev musi byt vyplnen")
            return
        }
        if(!countryId){
            setError("Vyberte zemi")
            return
        }
        if(!city.trim()){
            setError("Mesto musi byt vyplneno")
            return
        }
        if(!postalCode.trim()){
            setError("PSC musi byt vyplneno")
            return
        }
        if(!street.trim()){
            setError("Ulice musi byt vyplnena")
            return
        }
        if(!houseNumber.trim()){
            setError("Cislo popisne musi byt vyplneno")
            return
        }

        const isRegistered = Boolean(companyId?.trim());

        try {
            setSaving(true)

            if(isEditing){
                await updateCustomer(
                    customerId,
                    {
                        name: name.trim(),
                        companyId: companyId?.trim() || null,
                        countryId: countryId,
                        city: city.trim(),
                        postalCode: postalCode.trim(),
                        street: street.trim(),
                        houseNumber: houseNumber.trim(),
                        registered: isRegistered
                    }
                )
            }else{
                await createCustomer({
                    name: name.trim(),
                    companyId: companyId?.trim() || null,
                    countryId: countryId,
                    city: city.trim(),
                    postalCode: postalCode.trim(),
                    street: street.trim(),
                    houseNumber: houseNumber.trim(),
                    registered: isRegistered
                })
            }
            onClose()
            await onSaved()
        } catch {
            setError(
                isEditing
                    ? "Zakaznika se nepodarilo upravit"
                    : "Zakaznika se newpodarilo vytvorit"
            )
        }finally {
            setSaving(false)
        }
    }

    return{
        name,
        setName,
        companyId,
        setCompanyId,
        countryId,
        setCountryId,
        city,
        setCity,
        postalCode,
        setPostalCode,
        street,
        setStreet,
        houseNumber,
        setHouseNumber,
        saving,
        error,
        isEditing,
        handleSave,
        countries,
        loadingCountries,
        countriesError
    }
}