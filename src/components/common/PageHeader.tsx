type Props = {
    title: string;
    actionLabel?: string;
    onAction?: () => void;
}

export default function PageHeader({
    title,
    actionLabel,
    onAction
}:Props){
    return(
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>{title}</h1>

            {actionLabel && onAction && (
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={onAction}
                >
                    + {actionLabel}
                </button>
            )}
        </div>
    )
}