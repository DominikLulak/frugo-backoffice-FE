import type {Warehouse} from "../../../types/warehouse.ts";
import useWarehouseEditForm from "../../../hooks/warehouses/wh/modal/useWarehouseEditForm.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormSection from "../../common/form/FormSection.tsx";
import FormField from "../../common/form/FormField.tsx";

type Props = {
    show: boolean;
    warehouse: Warehouse | null;
    onClose: () => void;
    onSaved: () => void;
}

export default function WarehouseEditModal({
    show, onSaved, onClose, warehouse
}:Props){
    const {
        code, setCode, name, setName, description, setDescription,
        saving, errors, saveError, isEditing, handleSave
    } = useWarehouseEditForm({warehouseId: warehouse?.id ?? 0, warehouse: warehouse, onClose, onSaved})

    if(!show){
        return null
    }

    return (
        <>
            <BaseModal
                title={isEditing ? "Upravit sklad" : "Vytvorit sklad"}
                onClose={onClose}
                footer={
                    <ModalActions
                        onCancel={onClose}
                        onSubmit={handleSave}
                        cancelText="Zrusit"
                        submitText={isEditing ? "Ulozit zmeny" : "Pridat sklad"}
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
                    <FormField label="Kod skladu">
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
                    <FormField label="Nazev skladu">
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
                    <FormField label="Popis skladu">
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