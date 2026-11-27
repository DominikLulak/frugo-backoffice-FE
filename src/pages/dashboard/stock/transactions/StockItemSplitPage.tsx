import {useState} from "react";
import useStockItemSplit from "../../../../hooks/stockItems/transactions/useStockItemSplit.ts";
import PageHeader from "../../../../components/common/PageHeader.tsx";
import QrScannerModal from "../../../../components/common/scanner/QrScannerModal.tsx";

export default function StockItemSplitPage(){
    const [showQrScanner, setShowQrScanner] = useState(false)

    const {
        eti,
        quantity,
        submitting,
        submitError,
        success,

        updateEti,
        updateQuantity,
        submitSplit,
        resetForm
    } = useStockItemSplit()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        void submitSplit();
    };

    const handleScan = (scannedEti: string) => {
        updateEti(scannedEti);
        setShowQrScanner(false);
    };

    return(
        <div className="container-fluid">
            <PageHeader title="Rozdeleni skladoveho baleni" />

            <div className="card mb-4">
                <div className="card-header">
                    <h5 className="mb-0">Informace o rozdeleni</h5>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row g-3">

                            {/* ETI balení */}
                            <div className="col-md-8">
                                <label
                                    htmlFor="warehouseItemEti"
                                    className="form-label"
                                >
                                    ETI balení
                                </label>

                                <div className="input-group">
                                    <input
                                        id="warehouseItemEti"
                                        type="text"
                                        className="form-control"
                                        placeholder="Zadejte číslo ETI skladového balení"
                                        value={eti}
                                        onChange={event =>
                                            updateEti(event.target.value)
                                        }
                                        disabled={submitting}
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        onClick={() => setShowQrScanner(true)}
                                        disabled={submitting}
                                        title="Naskenovat ETI"
                                    >
                                        <i className="bi bi-camera" />
                                    </button>
                                </div>
                            </div>

                            {/* Mnozstvi */}
                            <div className="col-md-8">
                                <label
                                    htmlFor="splitQuantity"
                                    className="form-label"
                                >
                                    Mnozstvi k rozdeleni
                                </label>

                                <div className="input-group">
                                    <input
                                        id="splitQuantity"
                                        type="number"
                                        min={1}
                                        step={1}
                                        className="form-control"
                                        placeholder="Zadejte mnozstvi k rozdeleni"
                                        value={quantity ?? ""}
                                        onChange={event =>
                                            updateQuantity(
                                                event.target.value === "" ? null : Number(event.target.value)
                                            )
                                        }
                                        disabled={submitting}
                                    />
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
                                Skladové balení bylo úspěšně rozdeleno.
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
                                        Probíhá rozdeleni...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-arrow-left-right me-2" />
                                        Potvrdit rozdeleni
                                    </>
                                )}
                            </button>

                        </div>

                    </form>
                </div>
            </div>
            <QrScannerModal
                show={showQrScanner}
                onClose={() => setShowQrScanner(false)}
                onScan={handleScan}
                description={
                    "Po rozpoznání QR kódu se ETI balení vloží do formuláře."
                }
            />
        </div>
    )
}