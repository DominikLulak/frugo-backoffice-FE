type Props = {
    active: boolean;
    onClick: () => void;
}

export default function StatusButton({active, onClick}: Props){
    return(
        <div className="d-flex gap-2">
            <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={onClick}
            >
                {active ? "✓ Deaktivovat" : "✓ Aktivovat"}
            </button>
        </div>
    )
}