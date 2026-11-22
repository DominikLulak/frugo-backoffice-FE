import {useState} from "react";
import usePalletMovement from "../../../../hooks/pallets/transactions/usePalletMovement.ts";
import PageHeader from "../../../../components/common/PageHeader.tsx";
import QrScannerModal from "../../../../components/common/scanner/QrScannerModal.tsx";

type ScannerTarget = "palletEti" | "location";

export default function PalletMovementPage(){
    const [scannerTarget, setScannerTarget] = useState<ScannerTarget | null>(null)

    const {
        palletEti,
        targetLocationCode,
        submitting,
        submitError,
        success,

        updatePalletEti,
        updateTargetLocationCode,
        submitMovement,
        resetForm
    } = usePalletMovement()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        void submitMovement();
    };

    const handleScan = (value: string) => {
        if (scannerTarget === "palletEti") {
            updatePalletEti(value);
        }

        if (scannerTarget === "location") {
            updateTargetLocationCode(value);
        }

        setScannerTarget(null);
    };

    return(
        <div className="container-fluid">
            <PageHeader title="Přesun palety" />

            {/* Informace o přesunu */}
            <div className="card mb-4">
                <div className="card-header">
                    <h5 className="mb-0">Informace o přesunu</h5>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row g-3">

                            {/* ETI palety */}
                            <div className="col-md-8">
                                <label
                                    htmlFor="palletEti"
                                    className="form-label"
                                >
                                    ETI palety
                                </label>

                                <div className="input-group">
                                    <input
                                        id="warehouseItemEti"
                                        type="text"
                                        className="form-control"
                                        placeholder="Zadejte ETI palety"
                                        value={palletEti}
                                        onChange={event =>
                                            updatePalletEti(event.target.value)
                                        }
                                        disabled={submitting}
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        onClick={() => setScannerTarget("palletEti")}
                                        disabled={submitting}
                                        title="Naskenovat ETI"
                                    >
                                        <i className="bi bi-camera" />
                                    </button>
                                </div>
                            </div>

                            {/* Cílová lokace */}
                            <div className="col-md-8">
                                <label
                                    htmlFor="targetLocationCode"
                                    className="form-label"
                                >
                                    Cílová lokace
                                </label>

                                <div className="input-group">
                                    <input
                                        id="targetLocationCode"
                                        type="text"
                                        className="form-control"
                                        placeholder="Sklad;Sektor;Lokace"
                                        value={targetLocationCode}
                                        onChange={event =>
                                            updateTargetLocationCode(event.target.value)
                                        }
                                        disabled={submitting}
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        onClick={() => setScannerTarget("location")}
                                        disabled={submitting}
                                        title="Naskenovat cílovou lokaci"
                                    >
                                        <i className="bi bi-camera" />
                                    </button>
                                </div>

                                <div className="form-text">
                                    Zadejte cílovou lokaci nebo naskenujte její QR kód.
                                </div>
                            </div>

                        </div>

                        {submitError && (
                            <div className="alert alert-danger mt-3 mb-0">
                                {submitError}
                            </div>
                        )}

                        {success && (
                            <div className="alert alert-success mt-3 mb-0">
                                <i className="bi bi-check-circle me-2" />
                                Paleta byla úspěšně přesunuta.
                            </div>
                        )}

                        <hr className="my-4" />

                        <div className="d-flex justify-content-end gap-2">

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={resetForm}
                                disabled={submitting}
                            >
                                Vymazat
                            </button>

                            <button
                                type="submit"
                                className="btn btn-success"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                        />
                                        Probíhá přesun...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-arrow-left-right me-2" />
                                        Potvrdit přesun
                                    </>
                                )}
                            </button>

                        </div>

                    </form>
                </div>
            </div>

            <QrScannerModal
                show={scannerTarget !== null}
                onClose={() => setScannerTarget(null)}
                onScan={handleScan}
                description={
                    scannerTarget === "palletEti"
                        ? "Po rozpoznání QR kódu se ETI palety vloží do formuláře."
                        : "Po rozpoznání QR kódu se cílová lokace vloží do formuláře."
                }
            />
        </div>
    )
}