import {useEffect, useState} from "react";
import {getOrders, getOrderDetail} from "../../../api/OrdersApi.ts";
import OrderModal from "../../../components/orders/OrderModal.tsx";

export default function OrdersPage(){

    const [orders, setOrders] = useState<any[]>([])
    const [selectedOrder, setSelectedOrer] = useState<any>(null)
    const [items, setItems] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getOrders();
            setOrders(data);
        };
        fetchData();
    }, []);

    const openOrder = async (order: any) => {
        const data = await getOrderDetail(order.orderNumber)
        setItems(data)
        setSelectedOrer(order)
    }

    return(
        <div className="container-fluid">
            <h1>Objednávky</h1>

            <table className="table">
                <thead>
                <tr>
                    <th>Číslo objednávky</th>
                    <th>Stav</th>
                    <th>Zákazník</th>
                </tr>
                </thead>

                <tbody>
                {orders.map(o => (
                    <tr key={o.orderNumber}>
                        <td
                            style={{cursor: "pointer", color: "blue"}}
                            onClick={() => openOrder(o)}
                        >
                            {o.orderNumber}
                        </td>
                        <td>{o.status}</td>
                        <td>{o.customerName}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedOrder && (
                <OrderModal
                    items={items} onClose={() => setSelectedOrer(null)}
                />
            )}
        </div>
    )
}