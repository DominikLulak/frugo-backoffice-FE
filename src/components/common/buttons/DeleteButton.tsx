type Props = {
    onClick: () => void;
}

export default function DeleteButton({onClick}:Props){
    return(
        <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={onClick}
        >
            <i className="bi bi-trash me-1"/>
            Smazat
        </button>
    )
}