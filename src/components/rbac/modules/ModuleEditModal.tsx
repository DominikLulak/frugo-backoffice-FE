import type {ModuleDetail} from "../../../types/role.ts";
import useModuleEditForm from "../../../hooks/rbac/modules/edit/useModuleEditForm.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormSection from "../../common/form/FormSection.tsx";
import FormField from "../../common/form/FormField.tsx";

type Props = {
    show: boolean;
    module: ModuleDetail | null
    onClose: () => void;
    onSaved: () => void;
}

export default function ModuleEditModal({
    show,
    module,
    onClose,
    onSaved
}:Props){
    const {
        moduleCode, setModuleCode, moduleName, setModuleName,
        saving, errors, saveError, isEditing, handleSave
    } = useModuleEditForm({moduleId: module?.id ?? 0, module: module, onClose, onSaved})

    if(!show){
        return null
    }

    return (
        <>
            <BaseModal
                title={isEditing ? "Upravit modul" : "Vytvorit modul"}
                onClose={onClose}
                footer={
                    <ModalActions
                        onCancel={onClose}
                        onSubmit={handleSave}
                        cancelText="Zrusit"
                        submitText={isEditing ? "Ulozit zmeny" : "Pridat modul"}
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
                    <FormField label="Kod modulu">
                        <input
                            type="text"
                            className="form-control"
                            value={moduleCode}
                            onChange={(e) => setModuleCode(e.target.value)}
                            disabled={saving}
                        />
                        {errors.moduleCode && (
                            <div className="text-danger small mt-1">
                                {errors.moduleCode}
                            </div>
                        )}
                    </FormField>
                    <FormField label="Nazev modulu">
                        <input
                            type="text"
                            className="form-control"
                            value={moduleName}
                            onChange={(e) => setModuleName(e.target.value)}
                            disabled={saving}
                        />
                        {errors.moduleName && (
                            <div className="text-danger small mt-1">
                                {errors.moduleName}
                            </div>
                        )}
                    </FormField>
                </FormSection>
            </BaseModal>
        </>
    )
}