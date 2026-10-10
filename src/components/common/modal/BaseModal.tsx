type Props = {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    footer?: React.ReactNode;
    secondLevel?: boolean;
}

export default function BaseModal({
    title,
    onClose,
    children,
    footer,
    secondLevel = false
}:Props) {
    const levelClass = secondLevel
        ? " modal-custom-second"
        : ""
    const backdropClass = secondLevel
        ? " modal-backdrop-custom-second"
        : ""

    return(
        <div
            className={`modal-backdrop-custom${backdropClass}`}
            onClick={onClose}
        >
            <div
                className={`modal-custom${levelClass}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content-custom">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body">
                        {children}
                    </div>

                    {footer && (
                        <div className="modal-footer">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}