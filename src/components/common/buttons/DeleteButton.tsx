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
            🗑 Delete
        </button>
    )
}