
import * as React from "react";

import PageHeader from "../../../../components/common/PageHeader.tsx";

import usePurchaseOrderReceiving from "../../../../hooks/purchaseOrder/receiving/usePurchaseOrderReceiving.ts";
import PurchaseOrderReceivingTable
    from "../../../../components/purchaseOrders/receiving/PurchaseOrderReceivingTable.tsx";
import {useState} from "react";
import QrScannerModal from "../../../../components/common/scanner/QrScannerModal.tsx";

export default function PurchaseOrderReceivingPage() {
    const [showQrScanner, setShowQrScanner] = useState(false)


    const {
        purchaseOrderNumber,
        setPurchaseOrderNumber,

        purchaseOrder,
        itemForms,

        packagings,
        packagingLoading,
        packagingError,

        loading,
        error,

        submitting,
        submitError,
        receivingResult,

        searchPurchaseOrder,

        toggleItemSelection,
        addWarehouseItem,
        removeWarehouseItem,
        updateWarehouseItem,

        getRemainingQuantity,
        getReceivingQuantity,
        getPackageGrams,
        getSubpackageGrams,

        submitReceiving
    } = usePurchaseOrderReceiving();

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        searchPurchaseOrder();
    };

    return (
        <div className="container-fluid">

            <PageHeader title="Příjem nákupní objednávky" />

            {/* Vyhledání objednávky */}
            <div className="card mb-4">
                <div className="card-header">
                    <h5 className="mb-0">Vyhledání objednávky</h5>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSearch}>
                        <div className="row align-items-end g-2">

                            <div className="col-md-8">
                                <label
                                    htmlFor="purchaseOrderNumber"
                                    className="form-label"
                                >
                                    Číslo nákupní objednávky
                                </label>

                                <div className="input-group">
                                    <input
                                        id="purchaseOrderNumber"
                                        type="text"
                                        className="form-control"
                                        placeholder="Zadejte číslo objednávky"
                                        value={purchaseOrderNumber}
                                        onChange={event =>
                                            setPurchaseOrderNumber(event.target.value)
                                        }
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        onClick={() => setShowQrScanner(true)}
                                        title="Naskenovat QR kod"
                                    >
                                        <i className="bi bi-camera" />
                                    </button>
                                </div>
                            </div>

                            <div className="col-md-auto ms-auto px-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                            />
                                            Načítání...
                                        </>
                                    ) : (
                                        "Načíst objednávku"
                                    )}
                                </button>
                            </div>

                        </div>
                    </form>

                    {error && (
                        <div className="alert alert-danger mt-3 mb-0">
                            {error}
                        </div>
                    )}

                </div>
            </div>


            {/* Načtená objednávka */}
            {purchaseOrder && (
                <>
                    {/* Informace o objednávce */}
                    <div className="card mb-4">
                        <div className="card-header">
                            <h5 className="mb-0">Informace o objednávce</h5>
                        </div>

                        <div className="card-body">
                            <div className="row g-3">

                                <div className="col-md-3">
                                    <small className="text-muted">
                                        Číslo objednávky
                                    </small>

                                    <div className="fw-semibold">
                                        {purchaseOrder.purchaseOrderNumber}
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <small className="text-muted">
                                        Dodavatel
                                    </small>

                                    <div className="fw-semibold">
                                        {purchaseOrder.supplierName}
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <small className="text-muted">
                                        Datum vytvoření
                                    </small>

                                    <div className="fw-semibold">
                                        {purchaseOrder.createdAt.replace("T", " ").substring(0,19)}
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <small className="text-muted">
                                        Stav objednávky
                                    </small>

                                    <div className="fw-semibold">
                                        {purchaseOrder.statusCode}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    {/* Položky objednávky */}
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Položky objednávky</h5>
                        </div>

                        <div className="card-body">

                            <p className="text-muted">
                                Vyberte položky, které chcete přijmout.
                                U každé položky můžete vytvořit jednu nebo více palet.
                            </p>

                            <PurchaseOrderReceivingTable
                                items={purchaseOrder.items}
                                itemForms={itemForms}

                                packagings={packagings}
                                packagingLoading={packagingLoading}
                                packagingError={packagingError}

                                onToggleSelection={toggleItemSelection}
                                onAddWarehouseItem={addWarehouseItem}
                                onRemoveWarehouseItem={removeWarehouseItem}
                                onUpdateWarehouseItem={updateWarehouseItem}

                                getRemainingQuantity={getRemainingQuantity}
                                getReceivingQuantity={getReceivingQuantity}
                                getPackageGrams={getPackageGrams}
                                getSubpackageGrams={getSubpackageGrams}
                            />

                            {submitError && (
                                <div className="alert alert-danger mt-3">
                                    {submitError}
                                </div>
                            )}

                            <div className="d-flex justify-content-end mt-4">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    disabled={submitting || packagingLoading}
                                    onClick={() => void submitReceiving()}
                                >
                                    {submitting ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                            />
                                            Probiha prijem...
                                        </>
                                    ) : (
                                        "Potvrdit prijem"
                                    )}
                                </button>
                            </div>

                        </div>
                    </div>

                    {receivingResult && (
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5 className="mb-0">
                                    Vysledek prijmu
                                </h5>
                            </div>

                            <div className="card-body">
                                <div className="row g-3 mb-3">

                                    <div className="col-md-4">
                                        <div className="border rounded p-3">
                                            <small className="text-muted">
                                                Celkem polozek
                                            </small>

                                            <div className="fs-4 fw-semibold">
                                                {receivingResult.totalItems}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="border rounded p-3">
                                            <small className="text-muted">
                                                Úspěšně přijato
                                            </small>

                                            <div className="fs-4 fw-semibold text-success">
                                                {receivingResult.successfulItems}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="border rounded p-3">
                                            <small className="text-muted">
                                                Chyba
                                            </small>

                                            <div className="fs-4 fw-semibold text-danger">
                                                {receivingResult.failedItems}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="table-responsive">
                                    <table className="table table-sm align-middle">

                                        <thead>
                                        <tr>
                                            <th>ID položky objednávky</th>
                                            <th>Stav</th>
                                            <th>Vytvořené skladové položky</th>
                                            <th>Chyba</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {receivingResult.items.map(result => (
                                            <tr key={result.purchaseOrderItemId}>

                                                <td>
                                                    {result.purchaseOrderItemId}
                                                </td>

                                                <td>
                                                        <span className={
                                                            result.status === "SUCCESS"
                                                                ? "badge bg-success"
                                                                : "badge bg-danger"
                                                        }>
                                                            {result.status}
                                                        </span>
                                                </td>

                                                <td>
                                                    {result.warehouseItemIds.length > 0
                                                        ? result.warehouseItemIds.join(", ")
                                                        : "–"
                                                    }
                                                </td>

                                                <td>
                                                    {result.errorMessage ?? "–"}
                                                </td>

                                            </tr>
                                        ))}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}

            <QrScannerModal
                show={showQrScanner}
                onClose={() => setShowQrScanner(false)}
                onScan={(value) => {
                    setPurchaseOrderNumber(value)
                    setShowQrScanner(false)
                }}
                description="Po rozpoznání QR kódu se číslo vloží do pole pro vyhledání objednávky."
            />
        </div>
    );
}
