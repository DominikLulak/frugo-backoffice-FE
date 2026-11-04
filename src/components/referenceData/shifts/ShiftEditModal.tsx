import type {Shift} from "../../../types/referenceData.ts";
import useShiftEditForm from "../../../hooks/referenceData/shift/useShiftEditForm.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormSection from "../../common/form/FormSection.tsx";
import FormField from "../../common/form/FormField.tsx";

type Props = {
    show: boolean;
    shift: Shift | null;
    onClose: () => void;
    onSaved: () => void;
}

export default function ShiftEditModal({
    show, onClose, onSaved, shift
}:Props){
    const {
        code, setCode, description, setDescription,
        saving, errors, saveError, isEditing, handleSave
    } = useShiftEditForm({shiftId: shift?.id ?? 0, shift: shift, onClose, onSaved})

    if(!show){
        return null
    }

    return (
        <>
            <BaseModal
                title={isEditing ? "Upravit smennu" : "Vytvorit novou smenu"}
                onClose={onClose}
                footer={
                    <ModalActions
                        onCancel={onClose}
                        onSubmit={handleSave}
                        cancelText="Zrusit"
                        submitText={isEditing ? "Ulozit zmeny" : "Pridat smenu"}
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
                    <FormField label="Kod smeny">
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
                    <FormField label="Popis smeny">
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