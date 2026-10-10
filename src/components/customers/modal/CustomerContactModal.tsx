import type {CustomerContact} from "../../../types/customer.ts";
import {useState} from "react";
import {addCustomerContact, updateCustomerContact} from "../../../api/CustomerApi.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormField from "../../common/form/FormField.tsx";

type Props = {
    show: boolean;
    customerId: number;
    customerContact: CustomerContact | null;
    onClose: () => void;
    onSaved: () => void;
}

export default function CustomerContactModal({
    show,
    customerId,
    customerContact,
    onClose,
    onSaved
}:Props){

    const [name, setName] = useState(customerContact?.name ?? "");
    const [phoneNumber, setPhoneNumber] = useState(
        customerContact?.phoneNumber ?? ""
    );
    const [email, setEmail] = useState(customerContact?.email ?? "");
    const [primary, setPrimary] = useState(
        customerContact?.primary ?? false
    );

    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    const isEditing = customerContact !== null

    if(!show){
        return null
    }

    const handleSave = async () => {
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
            onSaved()
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

    return (
        <>
            <BaseModal
                title={isEditing ? "Upravit kontakt" : "Pridat kontakt"}
                onClose={onClose}
                secondLevel
                footer={
                    <ModalActions
                        onCancel={onClose}
                        onSubmit={handleSave}
                        cancelText="Zrusit"
                        submitText={isEditing ? "Ulozit zmeny" : "Pridat kontakt"}
                        loadingText="Ukladam..."
                        isLoading={saving}
                    />
                }
            >
                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <FormField label="Jmeno">
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={saving}
                    />
                </FormField>
                <FormField label="Telefon">
                    <input
                        type="text"
                        className="form-control"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        disabled={saving}
                    />
                </FormField>
                <FormField label="Email">
                    <input
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={saving}
                    />
                </FormField>
                <FormField label="Primarni">
                    <select
                        className="form-select"
                        value={primary ? "true" : "false"}
                        onChange={(e) => setPrimary(e.target.value === "true")}
                        disabled={saving}
                    >
                        <option value="true">
                            Ano
                        </option>
                        <option value="false">
                            Ne
                        </option>
                    </select>
                </FormField>
            </BaseModal>
        </>
    )
}