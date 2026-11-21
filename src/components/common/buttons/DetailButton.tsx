type Props = {
    onClick: () => void;
}

export default function DetailButton({onClick}: Props){
    return(
        <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={onClick}
        >
            <i className="bi bi-eye me-1"/>
            Detail
        </button>
    )
}