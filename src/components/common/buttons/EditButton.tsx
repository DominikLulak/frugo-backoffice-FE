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
            ✏ Edit
        </button>
    )
}