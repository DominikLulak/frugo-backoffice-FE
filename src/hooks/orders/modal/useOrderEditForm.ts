import { useEffect, useState } from "react";

import { getCustomers } from "../../../api/CustomerApi.ts";
import { updateOrder } from "../../../api/OrdersApi.ts";

import type { Customer } from "../../../types/customer.ts";
import type { OrderDetail } from "../../../types/order.ts";

type Props = {
    show: boolean;
    order: OrderDetail;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
};

export default function useOrderEditForm({
                                             show,
                                             order,
                                             onClose,
                                             onSaved,
                                         }: Props) {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customerId, setCustomerId] = useState(order.customerId);

    const [loadingCustomers, setLoadingCustomers] = useState(false);
    const [customersError, setCustomersError] = useState("");

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!show) return;

        setCustomerId(order.customerId);
        setError("");

        const fetchCustomers = async () => {
            try {
                setLoadingCustomers(true);
                setCustomersError("");

                const data = await getCustomers();
                setCustomers(data);
            } catch {
                setCustomersError("Nepodařilo se načíst zákazníky.");
            } finally {
                setLoadingCustomers(false);
            }
        };

        void fetchCustomers();
    }, [show, order.customerId]);

    const handleSave = async () => {
        if (customerId === null) {
            setError("Vyberte zákazníka.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            await updateOrder(order.id, { customerId });

            await onSaved();
            onClose();
        } catch {
            setError("Nepodařilo se upravit objednávku.");
        } finally {
            setSaving(false);
        }
    };

    return {
        customers,
        customerId,
        setCustomerId,

        loadingCustomers,
        customersError,

        saving,
        error,

        handleSave,
    };
}