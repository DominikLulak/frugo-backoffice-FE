import type {Country} from "../../../types/referenceData.ts";
import useCountryEditForm from "../../../hooks/referenceData/countries/useCountryEditForm.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormField from "../../common/form/FormField.tsx";
import FormSection from "../../common/form/FormSection.tsx";

type Props = {
    show: boolean;
    country: Country | null;
    onClose: () => void;
    onSaved: () => void;
}

export default function CountryEditModal({
    show, country, onSaved, onClose
}:Props){
    const {
        code, setCode, name, setName,
        saving, errors, saveError, isEditing, handleSave
    } = useCountryEditForm({countryId: country?.id ?? 0, country: country, onClose, onSaved})

    if(!show){
        return null
    }

    return (
        <>
            <BaseModal
                title={isEditing ? "Upravit zemi" : "Vytvorit novou zemi"}
                onClose={onClose}
                footer={
                    <ModalActions
                        onCancel={onClose}
                        onSubmit={handleSave}
                        cancelText="Zrusit"
                        submitText={isEditing ? "Ulozit zmeny" : "Pridat zemi"}
                        loadingText="Ukldam..."
                        isLoading={saving}
                    />
                }
            >
                {saveError && (
                    <div className="alert alert-danger">
                        {saveError}
                    </div>
                )}

                <FormSection>
                    <FormField label="Kod zeme">
                        <input
                            type="text"
                            className="form-control"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            disabled={saving}
                        />
                        {errors.code && (
                            <div className="text-danger small mt-1">
                                {errors.code}
                            </div>
                        )}
                    </FormField>
                    <FormField label="Nazev zeme">
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={saving}
                        />
                        {errors.name && (
                            <div className="text-danger small mt-1">
                                {errors.name}
                            </div>
                        )}
                    </FormField>
                </FormSection>
            </BaseModal>
        </>
    )
}