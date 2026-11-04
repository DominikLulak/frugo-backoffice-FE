import type {Packaging} from "../../../types/product.ts";
import usePackagingEditForm from "../../../hooks/referenceData/packaging/usePackagingEditForm.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormField from "../../common/form/FormField.tsx";
import FormSection from "../../common/form/FormSection.tsx";

type Props = {
    show: boolean;
    packaging: Packaging | null;
    onClose: () => void;
    onSaved: () => void;
}

export default function PackagingEditModal({
    show, onClose, onSaved, packaging
}:Props){
    const {
        code, setCode, name, setName, description, setDescription,
        saving, errors, saveError, isEditing, handleSave
    } = usePackagingEditForm({packagingId: packaging?.id ?? 0, packaging: packaging, onClose, onSaved})

    if(!show){
        return null
    }

    return (
        <>
            <BaseModal
                title={isEditing ? "Upravit typ baleni" : "Vytvorit novy typ baleni"}
                onClose={onClose}
                footer={
                    <ModalActions
                        onCancel={onClose}
                        onSubmit={handleSave}
                        cancelText="Zrusit"
                        submitText={isEditing ? "Ulozit zmeny" : "Pridat typ baleni"}
                        loadingText="Ukladam..."
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
                    <FormField label="Kod typu baleni">
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
                    <FormField label="Nazev typu baleni">
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
                    <FormField label="Popis typu baleni">
                        <input
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={saving}
                        />
                    </FormField>
                </FormSection>
            </BaseModal>
        </>
    )
}