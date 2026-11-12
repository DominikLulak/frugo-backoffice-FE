import type {Location} from "../../../types/warehouse.ts";
import useLocationEditForm from "../../../hooks/warehouses/location/modal/useLocationEditForm.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormSection from "../../common/form/FormSection.tsx";
import FormField from "../../common/form/FormField.tsx";

type Props = {
    show: boolean
    sectorId: number;
    sectorCode: string;
    location: Location | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function LocationEditModal({
    sectorCode, onClose, sectorId, onSaved, location, show
}:Props){
    const {
        code, setCode, aisle, setAisle, rack, setRack, level, setLevel,
        position, setPosition, canBeOrdered, setCanBeOrdered,
        saving, errors, saveError, isEditing, handleSave
    } = useLocationEditForm({
        sectorCode, onClose, onSaved, location, sectorId
    })

    if(!show){
        return null
    }

    return(
        <BaseModal
            title={isEditing ? "Upravit lokaci" : "Vytvorit lokaci"}
            onClose={onClose}
            level={3}
            footer={
                <ModalActions
                    onCancel={onClose}
                    onSubmit={handleSave}
                    cancelText="Zrusit"
                    submitText={isEditing ? "Ulozit zmeny" : "Pridat lokaci"}
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
                <FormField label="Kod lokace">
                    <input
                        type="text"
                        className={`form-control ${errors.code ? "is-invalid" : ""}`}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    {errors.code && (
                        <div className="invalid-feedback">
                            {errors.code}
                        </div>
                    )}
                </FormField>
                <FormField label="Ulicka">
                    <input
                        type="number"
                        className="form-control"
                        value={aisle}
                        onChange={(e) => setAisle(e.target.value === "" ? "" : Number(e.target.value))}
                    />
                </FormField>
                <FormField label="Regal">
                    <input
                        type="number"
                        className="form-control"
                        value={rack}
                        onChange={(e) => setRack(e.target.value === "" ? "" : Number(e.target.value))}
                    />
                </FormField>
                <FormField label="Uroven">
                    <input
                        type="number"
                        className="form-control"
                        value={level}
                        onChange={(e) => setLevel(e.target.value === "" ? "" : Number(e.target.value))}
                    />
                </FormField>
                <FormField label="Pozice">
                    <input
                        type="number"
                        className="form-control"
                        value={position}
                        onChange={(e) => setPosition(e.target.value === "" ? "" : Number(e.target.value))}
                    />
                </FormField>
                <FormField label="Lze objednat">
                    <select
                        className="form-select"
                        value={canBeOrdered ? "true" : "false"}
                        onChange={(e) =>
                            setCanBeOrdered(e.target.value === "true")
                        }
                    >
                        <option value="true">Ano</option>
                        <option value="false">Ne</option>
                    </select>
                </FormField>
            </FormSection>
        </BaseModal>
    )
}