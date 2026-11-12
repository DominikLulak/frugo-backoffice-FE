type Props = {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    footer?: React.ReactNode;
    level?: 1 | 2 | 3;
}

export default function BaseModal({
    title,
    onClose,
    children,
    footer,
    level = 1
}:Props) {
    const levelClass = level === 3
        ? "-third"
        : level === 2
            ? "-second"
            : "";

    return(
        <div
            className={`modal-backdrop-custom${levelClass ? ` modal-backdrop-custom${levelClass}` : ""}`}
            onClick={onClose}
        >
            <div
                className={`modal-custom${levelClass ? ` modal-custom${levelClass}` : ""}`}
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