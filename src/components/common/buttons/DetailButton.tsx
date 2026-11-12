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
            Detail
        </button>
    )
}