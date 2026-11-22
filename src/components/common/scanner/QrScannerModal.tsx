import useQrScanner from "../../../hooks/useQrScanner.ts";
import BaseModal from "../modal/BaseModal.tsx";

type QrScannerModalProps = {
    show: boolean;
    onClose: () => void;
    onScan: (value: string) => void;
    description: string;
}

export default function QrScannerModal({
    show, onScan, onClose, description
}:QrScannerModalProps){
    const {
        readerId, loading, error
    } = useQrScanner({
        enabled: show, onScan
    })

    if(!show){
        return null
    }

    return (
        <BaseModal
            title="Naskenovat QR kod"
            onClose={onClose}
            footer={
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                >
                    Zavrit
                </button>
            }
        >
            <div className="text-center mb-3">
                <p className="text-muted mb-0">
                    Namirte kameru na QR kod
                </p>
            </div>

            <div
                className="position-relative bg-dark rounded overflow-hidden"
                style={{minHeight: "300px"}}
            >
                <div id={readerId}/>

                {loading && !error && (
                    <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
                        <div className="spinner-border mb-2"/>
                        <div>Spoustim kameru</div>
                    </div>
                )}

                {error && (
                    <div className="position-absolute top-50 start-50 translate-middle text-white text-center w-75">
                        <i className="bi bi-camera-video-off fs-1 mb-2" />
                        <p>{error}</p>
                    </div>
                )}
            </div>

            <div className="aler alert-info mt-3 mb-0">
                <i className="bi bi-info-circle me-2" />
                {description}
            </div>
        </BaseModal>
    )
}