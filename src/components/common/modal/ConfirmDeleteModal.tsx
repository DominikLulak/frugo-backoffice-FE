type Props = {
    show: boolean;
    title: string;
    description: string;
    itemName: string;
    loading: boolean;
    error: string;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ConfirmDeleteModal({
    show,
    title,
    description,
    itemName,
    loading,
    error,
    onClose,
    onConfirm
}:Props){
    if(!show){
        return null
    }

    return (
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
                            className="btn btn-danger m-lg-1"
                            onClick={onConfirm}
                            disabled={loading}
                        >
                            {loading
                                ? "Odstranuji..."
                                : "Odstranit"
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}