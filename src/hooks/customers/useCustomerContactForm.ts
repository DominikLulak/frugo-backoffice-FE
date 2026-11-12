import type {CustomerContact} from "../../types/customer.ts";
import {useState} from "react";
import {addCustomerContact, updateCustomerContact} from "../../api/CustomerApi.ts";

type Props = {
    customerId: number;
    customerContact: CustomerContact | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function useCustomerContactForm({
    customerId,
    customerContact,
    onClose,
    onSaved
}:Props){
    const [name, setName] = useState(customerContact?.name ?? "")
    const [phoneNumber, setPhoneNumber] = useState(customerContact?.phoneNumber ?? "")
    const [email, setEmail] = useState(customerContact?.email ?? "")
    const [primary, setPrimary] = useState(customerContact?.primary ?? false)

    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    const isEditing = customerContact !== null

    const handleSave = async () => {
        if(saving) return

        setError("")

        if(!name.trim()){
            setError("Jmeno musi byt vyplneno")
            return
        }
        if(!phoneNumber.trim()){
            setError("Telefon musi byt vyplnen")
            return
        }
        if(!email.trim()){
            setError("Email musi byt vyplnen")
            return
        }

        try{
            setSaving(true)

            const data = {
                name: name.trim(),
                phoneNumber: phoneNumber.trim(),
                email: email.trim(),
                primary
            }

            if(isEditing && customerContact){
                await updateCustomerContact(
                    customerId,
                    customerContact.id,
                    data
                )
            }else{
                await addCustomerContact(customerId, data)
            }
            onClose()
            await onSaved()
        }catch {
            setError(
                isEditing
                    ? "Nepodarilo se upravit kontakt"
                    : "Nepodarilo se vytvorit kontakt"
            )
        }finally {
            setSaving(false)
        }
    }

    return{
        name,
        setName,
        phoneNumber,
        setPhoneNumber,
        email,
        setEmail,
        primary,
        setPrimary,
        saving,
        error,
        isEditing,
        handleSave
    }
}