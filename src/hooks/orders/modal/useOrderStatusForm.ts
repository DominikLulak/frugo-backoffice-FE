import { useState } from "react";

import { changeOrderStatus } from "../../../api/OrdersApi.ts";
import type { OrderDetail } from "../../../types/order.ts";

type Props = {
    order: OrderDetail;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
};

type OrderTransition = {
    code: string;
    label: string;
};

const allowedTransitions: Record<string, OrderTransition[]> = {
    ENTERED: [
        { code: "RELEASED", label: "Uvolněno" },
        { code: "BLOCKED", label: "Blokováno" },
        { code: "CANCELLED", label: "Zrušeno" },
    ],
    RELEASED: [
        { code: "BLOCKED", label: "Blokováno" },
        { code: "CANCELLED", label: "Zrušeno" },
    ],
    BLOCKED: [
        { code: "RELEASED", label: "Uvolněno" },
        { code: "CANCELLED", label: "Zrušeno" },
    ],
};

export default function useOrderStatusForm({
                                               order,
                                               onClose,
                                               onSaved,
                                           }: Props) {
    const [statusCode, setStatusCode] = useState("");
    const [note, setNote] = useState("");

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const transitions =
        allowedTransitions[order.statusCode] ?? [];

    const handleSave = async () => {
        if (!statusCode || !note.trim()) {
            setError("Vyberte nový stav a vyplňte důvod změny.");
            return;
        }

        const validTransition = transitions.some(
            transition => transition.code === statusCode,
        );

        if (!validTransition) {
            setError("Vybraný přechod mezi stavy není povolen.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            await changeOrderStatus(order.id, {
                statusCode,
                note: note.trim(),
            });

            await onSaved();
            onClose();
        } catch {
            setError("Nepodařilo se změnit stav objednávky.");
        } finally {
            setSaving(false);
        }
    };

    return {
        statusCode,
        setStatusCode,

        note,
        setNote,

        saving,
        error,
        transitions,

        handleSave,
    };
}