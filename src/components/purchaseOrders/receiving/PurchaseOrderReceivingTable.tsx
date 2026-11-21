import React from "react";
import type { PurchaseOrderItem } from "../../../types/purchaseOrder.ts";

import type {
    PurchaseOrderReceivingItemForm,
    PurchaseOrderReceivingWarehouseItemForm
} from "../../../types/purchaseOrderReceiving.ts";
import type {Packaging} from "../../../types/product.ts";

type Props = {
    items: PurchaseOrderItem[];
    itemForms: PurchaseOrderReceivingItemForm[];

    packagings: Packaging[];
    packagingLoading: boolean;
    packagingError: string | null;

    onToggleSelection: (purchaseOrderItemId: number) => void;
    onAddWarehouseItem: (purchaseOrderItemId: number) => void;

    onRemoveWarehouseItem: (
        purchaseOrderItemId: number,
        clientId: string
    ) => void;

    onUpdateWarehouseItem: (
        purchaseOrderItemId: number,
        clientId: string,
        changes: Partial<Omit<PurchaseOrderReceivingWarehouseItemForm, "clientId">>
    ) => void;

    getRemainingQuantity: (purchaseOrderItemId: number) => number;

    getReceivingQuantity: (
        warehouseItems: PurchaseOrderReceivingWarehouseItemForm[]
    ) => number;

    getPackageGrams: (
        warehouseItem: PurchaseOrderReceivingWarehouseItemForm
    ) => number | null;

    getSubpackageGrams: (
        warehouseItem: PurchaseOrderReceivingWarehouseItemForm
    ) => number | null;
};

export default function PurchaseOrderReceivingTable({
                                                        items,
                                                        itemForms,
                                                        packagings,
                                                        packagingLoading,
                                                        packagingError,
                                                        onToggleSelection,
                                                        onAddWarehouseItem,
                                                        onRemoveWarehouseItem,
                                                        onUpdateWarehouseItem,
                                                        getRemainingQuantity,
                                                        getReceivingQuantity,
                                                        getPackageGrams,
                                                        getSubpackageGrams
                                                    }: Props) {

    const getItemForm = (itemId: number) => {
        return itemForms.find(
            form => form.purchaseOrderItemId === itemId
        );
    };

    return (
        <div className="table-responsive">
            <table className="table table-hover align-middle">

                <thead>
                <tr>
                    <th></th>
                    <th>Produkt</th>
                    <th>Země původu</th>
                    <th>Objednáno (kg)</th>
                    <th>Přijato (kg)</th>
                    <th>Zbývá (kg)</th>
                </tr>
                </thead>

                <tbody>
                {items.map(item => {

                    const itemForm = getItemForm(item.id);
                    const remainingQuantity = getRemainingQuantity(item.id);
                    const selected = itemForm?.selected ?? false;

                    const warehouseItems = itemForm?.warehouseItems ?? []

                    const receivingQuantity = getReceivingQuantity(warehouseItems);

                    return (
                        <React.Fragment key={item.id}>

                            <tr>
                                <td>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={selected}
                                        disabled={remainingQuantity <= 0}
                                        onChange={() =>
                                            onToggleSelection(item.id)
                                        }
                                    />
                                </td>

                                <td>
                                    <div className="fw-semibold">
                                        {item.productName}
                                    </div>

                                    <small className="text-muted">
                                        {item.categoryCode} / {item.productType}
                                    </small>
                                </td>

                                <td>{item.countryName}</td>
                                <td>{item.quantity}</td>
                                <td>{item.receivedQuantity}</td>

                                <td>
                                        <span className={
                                            remainingQuantity > 0
                                                ? "text-success fw-semibold"
                                                : "text-muted"
                                        }>
                                            {remainingQuantity}
                                        </span>
                                </td>
                            </tr>

                            {selected && itemForm && (
                                <tr>
                                    <td colSpan={6} className="bg-light p-3">

                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div>
                                                <h6 className="mb-1">
                                                    Příjem – {item.productName}
                                                </h6>

                                                <small className="text-muted">
                                                    Zbývá přijmout {remainingQuantity} kg
                                                </small>
                                            </div>

                                            <button
                                                type="button"
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() =>
                                                    onAddWarehouseItem(item.id)
                                                }
                                            >
                                                + Přidat paletu
                                            </button>
                                        </div>

                                        {packagingError && (
                                            <div className="alert alert-danger">
                                                {packagingError}
                                            </div>
                                        )}

                                        {warehouseItems.map((warehouseItem, index) => {
                                            const packageGrams = getPackageGrams(warehouseItem)
                                            const subpackageGrams = getSubpackageGrams(warehouseItem)

                                            return(
                                                <div
                                                    key={warehouseItem.clientId}
                                                    className="card mb-3"
                                                >
                                                    <div className="card-body">

                                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                                            <h6 className="mb-0">
                                                                Paleta {index + 1}
                                                            </h6>

                                                            {warehouseItems.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-danger btn-sm"
                                                                    onClick={() =>
                                                                    onRemoveWarehouseItem(
                                                                        item.id,
                                                                        warehouseItem.clientId
                                                                    )
                                                                }
                                                                >
                                                                    Odebrat
                                                                </button>
                                                            )}
                                                        </div>

                                                        <div className="row g-3">

                                                            <div className="col-md-4">
                                                                <label className="form-label">
                                                                    Mnoztsvi (kg)
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    min="1"
                                                                    step="1"
                                                                    className="form-control"
                                                                    value={warehouseItem.quantity}
                                                                    onChange={event =>
                                                                        onUpdateWarehouseItem(
                                                                            item.id,
                                                                            warehouseItem.clientId,
                                                                            {
                                                                                quantity: event.target.value === ""
                                                                                    ? ""
                                                                                    : Number(event.target.value)
                                                                            }
                                                                        )
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="col-md-4">
                                                                <label className="form-label">
                                                                    Hlavni baleni
                                                                </label>

                                                                <select
                                                                    className="form-select"
                                                                    value={warehouseItem.packagingId ?? ""}
                                                                    disabled={packagingLoading}
                                                                    onChange={event =>
                                                                        onUpdateWarehouseItem(
                                                                            item.id,
                                                                            warehouseItem.clientId,
                                                                            {
                                                                                packagingId: event.target.value === ""
                                                                                    ? null
                                                                                    : Number(event.target.value)
                                                                            }
                                                                        )
                                                                    }
                                                                >
                                                                    <option value="">
                                                                        Vyberte baleni
                                                                    </option>

                                                                    {packagings.map(packaging => (
                                                                        <option
                                                                            key={packaging.id}
                                                                            value={packaging.id}
                                                                        >
                                                                            {packaging.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                            <div className="col-md-4">
                                                                <label className="form-label">
                                                                    Pocet hlavnich baleni
                                                                </label>

                                                                <input
                                                                    type="number"
                                                                    min="1"
                                                                    step="1"
                                                                    className="form-control"
                                                                    value={warehouseItem.packageCount}
                                                                    onChange={event =>
                                                                        onUpdateWarehouseItem(
                                                                            item.id,
                                                                            warehouseItem.clientId,
                                                                            {
                                                                                packageCount: event.target.value === ""
                                                                                    ? ""
                                                                                    : Number(event.target.value)
                                                                            }
                                                                        )
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="col-md-4">
                                                                <label className="form-label">
                                                                    Hmotnost jednoho baleni (g)
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={packageGrams ?? ""}
                                                                    placeholder="Automaticky"
                                                                    disabled
                                                                />
                                                            </div>

                                                            <div className="col-md-4">
                                                                <label className="form-label">
                                                                    Lokace prijmu
                                                                </label>

                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value="PRIJEM"
                                                                    disabled
                                                                />
                                                            </div>

                                                            <div className="col-md-4">
                                                                <label className="form-label">
                                                                    Podbaleni (volitelne)
                                                                </label>

                                                                <select
                                                                    className="form-select"
                                                                    value={warehouseItem.subpackagingId ?? ""}
                                                                    disabled={packagingLoading}
                                                                    onChange={event =>
                                                                        onUpdateWarehouseItem(
                                                                            item.id,
                                                                            warehouseItem.clientId,
                                                                            {
                                                                                subpackagingId: event.target.value === ""
                                                                                    ? null
                                                                                    : Number(event.target.value),
                                                                                subpackageCount: ""
                                                                            }
                                                                        )
                                                                    }
                                                                >
                                                                    <option value="">
                                                                        Bez podbaleni
                                                                    </option>

                                                                    {packagings.map(packaging => (
                                                                        <option
                                                                            key={packaging.id}
                                                                            value={packaging.id}
                                                                        >
                                                                            {packaging.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                            {warehouseItem.subpackagingId !== null && (
                                                                <>
                                                                    <div className="col-md-4">
                                                                        <label className="form-label">
                                                                            Pocet podbaleni v jednom baleni
                                                                        </label>

                                                                        <input
                                                                            type="number"
                                                                            min="1"
                                                                            step="1"
                                                                            className="form-control"
                                                                            value={warehouseItem.subpackageCount}
                                                                            onChange={event =>
                                                                                onUpdateWarehouseItem(
                                                                                    item.id,
                                                                                    warehouseItem.clientId,
                                                                                    {
                                                                                        subpackageCount: event.target.value === ""
                                                                                            ? ""
                                                                                            : Number(event.target.value)
                                                                                    }
                                                                                )
                                                                            }
                                                                        />
                                                                    </div>

                                                                    <div className="col-md-4">
                                                                        <label className="form-label">
                                                                            Hmotnost jednoho podbaleni (g)
                                                                        </label>

                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={subpackageGrams ?? ""}
                                                                            placeholder="Automaticky"
                                                                            disabled
                                                                        />
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                        <div className="d-flex justify-content-end mt-3">
                                                <span className={
                                                    receivingQuantity > remainingQuantity
                                                        ? "text-danger fw-semibold"
                                                        : "text-muted"
                                                }>
                                                    Rozděleno: {receivingQuantity} / {remainingQuantity} kg
                                                </span>
                                        </div>

                                    </td>
                                </tr>
                            )}

                        </React.Fragment>
                    );
                })}
                </tbody>

            </table>
        </div>
    );
}
