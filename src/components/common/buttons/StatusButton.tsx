type Props = {
    active: boolean;
    onClick: () => void;
}

export default function StatusButton({active, onClick}: Props){
    return(
        <div className="d-flex gap-2">
            <button
                type="button"
                className="btn btn-sm btn-outline-success"
                onClick={onClick}
            >
                <i className="bi bi-arrow-clockwise me-1"/>
                {active ? "Deaktivovat" : "Aktivovat"}
            </button>
        </div>
    )
}