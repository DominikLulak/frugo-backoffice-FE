import type {CustomerContact} from "../../types/customer.ts";
import {useState} from "react";
import {addCustomerContact, updateCustomerContact} from "../../api/CustomerApi.ts";

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
        <div
            className="modal-backdrop-custom modal-backdrop-custom-second"
            onClick={onClose}
        >
            <div
                className="modal-custom modal-custom-second"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content-custom">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {isEditing ? "Upravit kontakt" : "Pridat kontakt"}
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            disabled={saving}
                        />
                    </div>

                    <div className="modal-body">

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="form-label">
                                Jmeno
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={saving}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Telefon
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                disabled={saving}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Email
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={saving}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Primarni
                            </label>

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
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={saving}
                        >
                            Zrusit
                        </button>

                        <button
                            type="button"
                            className="btn btn-success m-lg-1"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? "Ukladam..." : "Ulozit"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}