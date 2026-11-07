import type {SectorType} from "../../../types/warehouse.ts";
import useSectorTypeEditForm from "../../../hooks/warehouses/sectorType/modal/useSectorTypeEditForm.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormSection from "../../common/form/FormSection.tsx";
import FormField from "../../common/form/FormField.tsx";

type Props = {
    show: boolean;
    sectorType: SectorType | null;
    onClose: () => void;
    onSaved: () => void;
}

export default function SectorTypeEditModal({
    show, onSaved, onClose, sectorType
}:Props){
    const {
        code, setCode, name, setName, description, setDescription,
        saving, errors, saveError, isEditing, handleSave
    } = useSectorTypeEditForm({sectorTypeId: sectorType?.id ?? 0, sectorType: sectorType, onClose, onSaved})

    if(!show){
        return null
    }

    return (
        <>
            <BaseModal
                title={isEditing ? "Upravit typ sektoru" : "Vytvorit typ sektoru"}
                onClose={onClose}
                footer={
                    <ModalActions
                        onCancel={onClose}
                        onSubmit={handleSave}
                        cancelText="Zrusit"
                        submitText={isEditing ? "Ulozit zmeny" : "Pridat typ sektoru"}
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
                    <FormField label="Kod typu sektoru">
                        <input
                            type="text"
                            className="form-control"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        {errors.code && (
                            <div className="text-danger small mt-1">
                                {errors.code}
                            </div>
                        )}
                    </FormField>
                    <FormField label="Nazev typu sektoru">
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && (
                            <div className="text-danger small mt-1">
                                {errors.name}
                            </div>
                        )}
                    </FormField>
                    <FormField label="Popis typu sektoru">
                        <input
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormField>
                </FormSection>
            </BaseModal>
        </>
    )
}