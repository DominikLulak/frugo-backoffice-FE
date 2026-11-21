
import { useCallback, useEffect, useState } from "react";

import type {
    PurchaseOrderReceivingDto,
    PurchaseOrderReceivingItemForm,
    PurchaseOrderReceivingResultDto,
    PurchaseOrderReceivingWarehouseItemForm
} from "../../../types/purchaseOrderReceiving.ts";

import type { PurchaseOrderDetail } from "../../../types/purchaseOrder.ts";
import type { Packaging } from "../../../types/product.ts";

import {
    getPurchaseOrderDetail,
    getPurchaseOrders
} from "../../../api/PurchaseOrderApi.ts";

import { getPackaging } from "../../../api/PackagingApi.ts";
import { receivePurchaseOrder } from "../../../api/PurchaseOrderReceivingApi.ts";


/**
 * Vytvoří prázdnou paletu ve formuláři.
 */
const createEmptyWarehouseItem = (): PurchaseOrderReceivingWarehouseItemForm => ({
    clientId: crypto.randomUUID(),
    quantity: "",
    packagingId: null,
    packageCount: "",
    subpackagingId: null,
    subpackageCount: ""
});


/**
 * Vytvoří počáteční formulář pro položky objednávky.
 */
const createInitialItemForm = (
    purchaseOrder: PurchaseOrderDetail
): PurchaseOrderReceivingItemForm[] => {

    return purchaseOrder.items.map(item => ({
        purchaseOrderItemId: item.id,
        selected: false,
        warehouseItems: []
    }));
};


/**
 * Převede kilogramy na celé gramy.
 *
 * Vrací null, pokud hmotnost nelze vyjádřit
 * celým počtem gramů.
 */
const convertKgToWholeGrams = (quantityKg: number): number | null => {

    if (!Number.isFinite(quantityKg) || quantityKg <= 0) {
        return null;
    }

    const grams = quantityKg * 1000;
    const roundedGrams = Math.round(grams);

    // Ošetření nepřesností desetinných čísel v JavaScriptu.
    if (Math.abs(grams - roundedGrams) > 0.000001) {
        return null;
    }

    if (!Number.isSafeInteger(roundedGrams)) {
        return null;
    }

    return roundedGrams;
};


/**
 * Vypočítá hmotnost jednoho hlavního balení.
 */
const calculatePackageGrams = (
    quantityKg: number,
    packageCount: number
): number | null => {

    const totalGrams = convertKgToWholeGrams(quantityKg);

    if (totalGrams === null) {
        return null;
    }

    if (!Number.isInteger(packageCount) || packageCount <= 0) {
        return null;
    }

    const packageGrams = totalGrams / packageCount;

    if (!Number.isSafeInteger(packageGrams)) {
        return null;
    }

    return packageGrams;
};


/**
 * Vypočítá hmotnost jednoho podbalení.
 */
const calculateSubpackageGrams = (
    packageGrams: number,
    subpackageCount: number
): number | null => {

    if (!Number.isInteger(subpackageCount) || subpackageCount <= 0) {
        return null;
    }

    const subpackageGrams = packageGrams / subpackageCount;

    if (!Number.isSafeInteger(subpackageGrams)) {
        return null;
    }

    return subpackageGrams;
};


const usePurchaseOrderReceiving = () => {

    // --------------------------------------------------
    // Stav objednávky
    // --------------------------------------------------

    const [purchaseOrderNumber, setPurchaseOrderNumber] = useState("");

    const [purchaseOrder, setPurchaseOrder] =
        useState<PurchaseOrderDetail | null>(null);

    const [itemForms, setItemForms] =
        useState<PurchaseOrderReceivingItemForm[]>([]);


    // --------------------------------------------------
    // Seznam balení
    // --------------------------------------------------

    const [packagings, setPackagings] = useState<Packaging[]>([]);

    const [packagingLoading, setPackagingLoading] = useState(false);

    const [packagingError, setPackagingError] =
        useState<string | null>(null);


    // --------------------------------------------------
    // Stav načítání a příjmu
    // --------------------------------------------------

    const [loading, setLoading] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const [submitError, setSubmitError] = useState<string | null>(null);

    const [receivingResult, setReceivingResult] =
        useState<PurchaseOrderReceivingResultDto | null>(null);


    // --------------------------------------------------
    // Načtení seznamu balení
    // --------------------------------------------------

    const fetchPackaging = useCallback(async () => {

        setPackagingLoading(true);
        setPackagingError(null);

        try {

            const data = await getPackaging();

            setPackagings(data);

        } catch (err) {

            setPackagingError(
                err instanceof Error
                    ? err.message
                    : "Nepodařilo se načíst seznam balení."
            );

        } finally {

            setPackagingLoading(false);
        }

    }, []);


    useEffect(() => {
        void fetchPackaging();
    }, [fetchPackaging]);


    // --------------------------------------------------
    // Vyhledání nákupní objednávky
    // --------------------------------------------------

    const searchPurchaseOrder = async () => {

        const searchNumber = purchaseOrderNumber.trim();

        if (!searchNumber) {
            setError("Zadejte číslo nákupní objednávky.");
            return;
        }

        setLoading(true);
        setError(null);
        setSubmitError(null);
        setReceivingResult(null);

        setPurchaseOrder(null);
        setItemForms([]);

        try {

            const orders = await getPurchaseOrders(searchNumber);

            const matchingOrder = orders.find(
                order => order.purchaseOrderNumber === searchNumber
            );

            if (!matchingOrder) {
                setError("Nákupní objednávka nebyla nalezena.");
                return;
            }

            const detail = await getPurchaseOrderDetail(matchingOrder.id);

            if (!["ENTERED", "RELEASED"].includes(detail.statusCode)) {
                setError("Tuto objednávku nelze přijmout.");
                return;
            }

            setPurchaseOrder(detail);
            setItemForms(createInitialItemForm(detail));

        } catch (err) {

            setError(
                err instanceof Error
                    ? err.message
                    : "Nepodařilo se načíst nákupní objednávku."
            );

        } finally {

            setLoading(false);
        }
    };


    // --------------------------------------------------
    // Výběr položky objednávky
    // --------------------------------------------------

    const toggleItemSelection = (purchaseOrderItemId: number) => {

        setReceivingResult(null);
        setSubmitError(null);

        setItemForms(previous =>
            previous.map(item => {

                if (item.purchaseOrderItemId !== purchaseOrderItemId) {
                    return item;
                }

                const selected = !item.selected;

                return {
                    ...item,
                    selected,
                    warehouseItems: selected
                        ? [createEmptyWarehouseItem()]
                        : []
                };
            })
        );
    };


    // --------------------------------------------------
    // Přidání palety
    // --------------------------------------------------

    const addWarehouseItem = (purchaseOrderItemId: number) => {

        setReceivingResult(null);
        setSubmitError(null);

        setItemForms(previous =>
            previous.map(item =>
                item.purchaseOrderItemId === purchaseOrderItemId
                    ? {
                        ...item,
                        warehouseItems: [
                            ...item.warehouseItems,
                            createEmptyWarehouseItem()
                        ]
                    }
                    : item
            )
        );
    };


    // --------------------------------------------------
    // Odebrání palety
    // --------------------------------------------------

    const removeWarehouseItem = (
        purchaseOrderItemId: number,
        clientId: string
    ) => {

        setReceivingResult(null);
        setSubmitError(null);

        setItemForms(previous =>
            previous.map(item =>
                item.purchaseOrderItemId === purchaseOrderItemId
                    ? {
                        ...item,
                        warehouseItems: item.warehouseItems.filter(
                            warehouseItem => warehouseItem.clientId !== clientId
                        )
                    }
                    : item
            )
        );
    };


    // --------------------------------------------------
    // Úprava palety
    // --------------------------------------------------

    const updateWarehouseItem = (
        purchaseOrderItemId: number,
        clientId: string,
        changes: Partial<Omit<PurchaseOrderReceivingWarehouseItemForm, "clientId">>
    ) => {

        setReceivingResult(null);
        setSubmitError(null);

        setItemForms(previous =>
            previous.map(item =>
                item.purchaseOrderItemId === purchaseOrderItemId
                    ? {
                        ...item,
                        warehouseItems: item.warehouseItems.map(warehouseItem =>
                            warehouseItem.clientId === clientId
                                ? { ...warehouseItem, ...changes }
                                : warehouseItem
                        )
                    }
                    : item
            )
        );
    };


    // --------------------------------------------------
    // Zbývající množství objednané položky
    // --------------------------------------------------

    const getRemainingQuantity = (purchaseOrderItemId: number): number => {

        const item = purchaseOrder?.items.find(
            item => item.id === purchaseOrderItemId
        );

        if (!item) {
            return 0;
        }

        return Math.max(0, item.quantity - item.receivedQuantity);
    };


    // --------------------------------------------------
    // Součet množství připravovaných palet
    // --------------------------------------------------

    const getReceivingQuantity = (
        warehouseItems: PurchaseOrderReceivingWarehouseItemForm[]
    ): number => {

        return warehouseItems.reduce(
            (total, item) =>
                total + (
                    typeof item.quantity === "number"
                        ? item.quantity
                        : 0
                ),
            0
        );
    };


    // --------------------------------------------------
    // Validace a sestavení requestu
    // --------------------------------------------------

    const buildReceivingRequest = ():
        PurchaseOrderReceivingDto | null => {

        if (!purchaseOrder) {
            setSubmitError("Nejprve vyhledejte nákupní objednávku.");
            return null;
        }

        const selectedItems = itemForms.filter(item => item.selected);

        if (selectedItems.length === 0) {
            setSubmitError("Vyberte alespoň jednu položku k příjmu.");
            return null;
        }

        const requestItems: PurchaseOrderReceivingDto["items"] = [];

        for (const itemForm of selectedItems) {

            const orderItem = purchaseOrder.items.find(
                item => item.id === itemForm.purchaseOrderItemId
            );

            if (!orderItem) {
                setSubmitError("Nepodařilo se dohledat položku objednávky.");
                return null;
            }

            if (itemForm.warehouseItems.length === 0) {
                setSubmitError(
                    `Položka ${orderItem.productName} nemá zadanou žádnou paletu.`
                );
                return null;
            }

            const receivingQuantity = getReceivingQuantity(
                itemForm.warehouseItems
            );

            if (receivingQuantity <= 0) {
                setSubmitError(
                    `Zadejte množství pro položku ${orderItem.productName}.`
                );
                return null;
            }

            const remainingQuantity = getRemainingQuantity(
                itemForm.purchaseOrderItemId
            );

            if (receivingQuantity - remainingQuantity > 0.000001) {
                setSubmitError(
                    `Přijímané množství položky ${orderItem.productName} ` +
                    `překračuje zbývající množství (${remainingQuantity} kg).`
                );
                return null;
            }

            const warehouseItems = [];

            for (const warehouseItem of itemForm.warehouseItems) {

                const quantity = warehouseItem.quantity;

                if (
                    typeof quantity !== "number" ||
                    !Number.isFinite(quantity) ||
                    quantity <= 0
                ) {
                    setSubmitError(
                        `Zadejte platné množství na každé paletě (${orderItem.productName}).`
                    );
                    return null;
                }

                if (warehouseItem.packagingId === null) {
                    setSubmitError(
                        `Vyberte hlavní balení (${orderItem.productName}).`
                    );
                    return null;
                }

                if (
                    typeof warehouseItem.packageCount !== "number" ||
                    !Number.isInteger(warehouseItem.packageCount) ||
                    warehouseItem.packageCount <= 0
                ) {
                    setSubmitError(
                        `Počet hlavních balení musí být kladné celé číslo (${orderItem.productName}).`
                    );
                    return null;
                }

                const quantityPerPackage = calculatePackageGrams(
                    quantity,
                    warehouseItem.packageCount
                );

                if (quantityPerPackage === null) {
                    setSubmitError(
                        `Hmotnost na jedno hlavní balení nevychází na celé gramy ` +
                        `(${orderItem.productName}). Zkontrolujte množství a počet balení.`
                    );
                    return null;
                }

                let quantityPerSubpackage: number | null = null;

                if (warehouseItem.subpackagingId !== null) {

                    if (
                        typeof warehouseItem.subpackageCount !== "number" ||
                        !Number.isInteger(warehouseItem.subpackageCount) ||
                        warehouseItem.subpackageCount <= 0
                    ) {
                        setSubmitError(
                            `Počet podbalení musí být kladné celé číslo (${orderItem.productName}).`
                        );
                        return null;
                    }

                    quantityPerSubpackage = calculateSubpackageGrams(
                        quantityPerPackage,
                        warehouseItem.subpackageCount
                    );

                    if (quantityPerSubpackage === null) {
                        setSubmitError(
                            `Hmotnost na jedno podbalení nevychází na celé gramy ` +
                            `(${orderItem.productName}). Zkontrolujte počet podbalení.`
                        );
                        return null;
                    }
                }

                warehouseItems.push({
                    quantity,
                    packagingId: warehouseItem.packagingId,
                    quantityPerPackage,
                    subpackagingId: warehouseItem.subpackagingId,
                    quantityPerSubpackage
                });
            }

            requestItems.push({
                purchaseOrderItemId: itemForm.purchaseOrderItemId,
                items: warehouseItems
            });
        }

        return {
            purchaseOrderId: purchaseOrder.id,
            items: requestItems
        };
    };


    // --------------------------------------------------
    // Potvrzení příjmu
    // --------------------------------------------------

    const submitReceiving = async () => {

        if (submitting) {
            return;
        }

        setSubmitError(null);
        setReceivingResult(null);

        const request = buildReceivingRequest();

        if (!request || !purchaseOrder) {
            return;
        }

        setSubmitting(true);

        try {

            const result = await receivePurchaseOrder(
                purchaseOrder.id,
                request
            );

            setReceivingResult(result);

        } catch (err) {

            setSubmitError(
                err instanceof Error
                    ? err.message
                    : "Při příjmu nákupní objednávky nastala chyba."
            );

        } finally {

            setSubmitting(false);
        }
    };


    const getPackageGrams = (
        warehouseItem: PurchaseOrderReceivingWarehouseItemForm
    ): number | null => {
        if (
            typeof warehouseItem.quantity !== "number" ||
            typeof warehouseItem.packageCount !== "number"
        ) {
            return null;
        }

        return calculatePackageGrams(
            warehouseItem.quantity,
            warehouseItem.packageCount
        );
    };

    const getSubpackageGrams = (
        warehouseItem: PurchaseOrderReceivingWarehouseItemForm
    ): number | null => {
        if (warehouseItem.subpackagingId === null) {
            return null;
        }

        const packageGrams = getPackageGrams(warehouseItem);

        if (
            packageGrams === null ||
            typeof warehouseItem.subpackageCount !== "number"
        ) {
            return null;
        }

        return calculateSubpackageGrams(
            packageGrams,
            warehouseItem.subpackageCount
        );
    };

    // --------------------------------------------------
    // Návratové hodnoty hooku
    // --------------------------------------------------

    return {
        purchaseOrderNumber,
        setPurchaseOrderNumber,

        purchaseOrder,
        itemForms,

        packagings,
        packagingLoading,
        packagingError,
        fetchPackaging,

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
    };
};


export default usePurchaseOrderReceiving;
