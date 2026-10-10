import type {CustomerDetail} from "../../../types/customer.ts";
import useCustomerEditForm from "../../../hooks/customers/useCustomerEditForm.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import FormField from "../../common/form/FormField.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";

type Props = {
    show: boolean;
    customer: CustomerDetail | null;
    onClose: () => void;
    onSaved: () => void;
}

export default function CustomerEditModal({
    show,
    customer,
    onClose,
    onSaved
}:Props){
    const {
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
    } = useCustomerEditForm({customerId: customer?.id ?? 0, customerDetail: customer, onClose, onSaved})

    if(!show){
        return null
    }

    return (
        <>
            <BaseModal
                title={isEditing ? "Upravit zakaznika" : "Vytvorit zakaznika"}
                onClose={onClose}
                footer={
                    <ModalActions
                        onCancel={onClose}
                        onSubmit={handleSave}
                        cancelText="Zrusit"
                        submitText={isEditing ? "Ulozit zmeny" : "Pridat zakaznika"}
                        loadingText="Ukladam..."
                        isLoading={saving}
                    />
                }
            >
                {(error || countriesError) && (
                    <div className="alert alert-danger">
                        {error || countriesError}
                    </div>
                )}

                <FormField label="Nazev / Jmeno zakaznika">
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={saving}
                    />
                </FormField>
                <FormField label="ICO">
                    <input
                        type="text"
                        className="form-control"
                        value={companyId ?? ""}
                        onChange={(e) => setCompanyId(e.target.value)}
                        disabled={saving}
                    />
                </FormField>
                <FormField label="Zeme">
                    <select
                        className="form-control"
                        value={countryId}
                        onChange={(e) => setCountryId(e.target.value === "" ? "" : Number(e.target.value))}
                        disabled={saving || loadingCountries}
                    >
                        <option value="">
                            Zvolte zemi
                        </option>
                        {countries.map(country => (
                            <option
                                key={country.id}
                                value={country.id}
                            >
                                {country.name} ({country.code})
                            </option>
                        ))}
                    </select>
                </FormField>
                <FormField label="Mesto">
                    <input
                        type="text"
                        className="form-control"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={saving}
                    />
                </FormField>
                <FormField label="PSC">
                    <input
                        type="text"
                        className="form-control"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        disabled={saving}
                    />
                </FormField>
                <FormField label="Ulice">
                    <input
                        type="text"
                        className="form-control"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        disabled={saving}
                    />
                </FormField>
                <FormField label="Cislo popisne">
                    <input
                        type="text"
                        className="form-control"
                        value={houseNumber}
                        onChange={(e) => setHouseNumber(e.target.value)}
                        disabled={saving}
                    />
                </FormField>
            </BaseModal>
        </>
    )
}