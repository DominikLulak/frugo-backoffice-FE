import type {CustomerContact} from "../../../types/customer.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormField from "../../common/form/FormField.tsx";
import useCustomerContactForm from "../../../hooks/customers/useCustomerContactForm.ts";

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

    const {
        name, setName, phoneNumber, setPhoneNumber, email, setEmail, primary, setPrimary, saving, error, isEditing, handleSave
    } = useCustomerContactForm({ customerId, customerContact, onClose, onSaved })

    if(!show) return null

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