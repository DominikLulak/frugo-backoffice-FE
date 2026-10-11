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
        <div
            className="modal-backdrop-custom modal-backdrop-custom-delete"
            onClick={onClose}
        >
            <div
                className="modal-custom modal-custom-delete"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content-custom">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            disabled={loading}
                        />
                    </div>

                    <div className="modal-body">
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
                    </div>

                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Zrusit
                        </button>

                        <button
                            type="button"
                            className="btn btn-success m-lg-1"
                            onClick={onConfirm}
                            disabled={loading}
                        >
                            {loading
                                ? "Vytvarim..."
                                : "Vytvorit login"
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}