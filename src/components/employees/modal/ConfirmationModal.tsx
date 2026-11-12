import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";

type Props = {
    show: boolean;
    title: string;
    loading: boolean;
    description: string;
    itemName: string;
    error: string;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ConfirmationModal({ show, title, loading, description, itemName, error, onClose, onConfirm
}:Props) {
   if(!show) return null

    return(
        <>
            <BaseModal
                title={title}
                onClose={onClose}
                footer={
                    <ModalActions
                        onCancel={onClose}
                        onSubmit={onConfirm}
                        cancelText="Zrusit"
                        submitText="Vytvorit login"
                        loadingText="Vytvarim..."
                        isLoading={loading}
                    />
                }
            >
                <p>
                    {description}
                </p>

                <p className="mb-0">
                    <strong>{itemName}</strong>
                </p>


                <p className="mb-0">
                    Login je ve formatu
                </p>
                <p className="mb-0">
                    username : <strong>LASTNAME_FIRSTNAME</strong>
                </p>
                <p className="mb-0">
                    password : <strong>_FRUGO$(employeeNumber)_</strong>
                </p>

                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}
            </BaseModal>
        </>
    )
}