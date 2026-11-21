import {useState} from "react";

type Props = {
    onClick: () => Promise<void>
}

export default function PdfButton({onClick}:Props){
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        if(loading) return;

        setLoading(true)

        try{
            await onClick()
        }finally {
            setLoading(false)
        }
    }

    return(
        <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={handleClick}
            disabled={loading}
            title="Stahnout PDF"
        >
            {loading ? (
                <>
                    <span
                        className="spinner-border spinner-border-sm me-1"
                        aria-hidden="true"
                    />
                    PDF
                </>
            ) : (
                <>
                    <i className="bi bi-file-earmark-pdf me-1"/>
                    PDF
                </>
            )}
        </button>
    )
}