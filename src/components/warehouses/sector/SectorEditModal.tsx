import type {WarehouseSector} from "../../../types/warehouse.ts";
import useSectorEditForm from "../../../hooks/warehouses/sector/modal/useSectorEditForm.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormSection from "../../common/form/FormSection.tsx";
import FormField from "../../common/form/FormField.tsx";

type Props = {
    show: boolean;
    warehouseId: number;
    sector: WarehouseSector | null;
    onClose: () => void;
    onSaved: () => void;
}

export default function SectorEditModal({
    show, onClose, onSaved, sector, warehouseId
}:Props){
    const form = useSectorEditForm({
        warehouseId, sector, onClose, onSaved
    })

    if(!show){
        return null
    }

    return (
        <>
            <BaseModal
                title={form.isEditing ? "Upravit sektor" : "Vytvorit sektor"}
                onClose={onClose}
                level={2}
                footer={
                    <ModalActions
                        onCancel={onClose}
                        onSubmit={form.handleSave}
                        cancelText="Zrusit"
                        submitText={form.isEditing ? "Ulozit zmeny" : "Pridat sektor"}
                        loadingText="Ukladam..."
                        isLoading={form.saving}
                    />
                }
            >
                {form.saveError && (
                    <div className="alert alert-danger">
                        {form.saveError}
                    </div>
                )}

                {form.sectorTypesError && (
                    <div className="alert alert-danger">
                        {form.sectorTypesError}
                    </div>
                )}

                <FormSection>
                    <FormField label="Kod sektoru">
                        <input
                            type="text"
                            className="form-control"
                            value={form.code}
                            onChange={(e) => form.setCode(e.target.value)}
                        />
                        {form.errors.code && (
                            <div className="text-danger small mt-1">
                                {form.errors.code}
                            </div>
                        )}
                    </FormField>
                    <FormField label="Nazev sektoru">
                        <input
                            type="text"
                            className="form-control"
                            value={form.name}
                            onChange={(e) => form.setName(e.target.value)}
                        />
                        {form.errors.name && (
                            <div className="text-danger small mt-1">
                                {form.errors.name}
                            </div>
                        )}
                    </FormField>
                    <FormField label="Popis sektoru">
                        <input
                            type="text"
                            className="form-control"
                            value={form.description}
                            onChange={(e) => form.setDescription(e.target.value)}
                        />
                    </FormField>
                    <FormField label="Typ sektoru">
                        <select
                            className="form-select"
                            value={form.sectorTypeId ?? ""}
                            onChange={(e) => form.setSectorTypeId(
                                e.target.value ? Number(e.target.value) : null
                            )}
                            disabled={form.loadingSectorTypes}
                        >
                            <option value="">
                                {form.loadingSectorTypes
                                    ? "Nacitam typy sektoru..."
                                    : "Vyberte typ sektoru"
                                }
                            </option>

                            {form.sectorTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.code} - {type.name}
                                </option>
                            ))}
                        </select>

                        {form.errors.sectorTypeId && (
                            <div className="text-danger small mt-1">
                                {form.errors.sectorTypeId}
                            </div>
                        )}
                    </FormField>
                </FormSection>
            </BaseModal>
        </>
    )
}