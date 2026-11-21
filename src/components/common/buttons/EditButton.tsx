type Props = {
    onClick: () => void;
}

export default function EditButton({onClick}:Props){
    return(
        <button
            type="button"
            className="btn btn-sm btn-outline-warning"
            onClick={onClick}
        >
            <i className="bi bi-pencil me-1"/>
            Upravit
        </button>
    )
}