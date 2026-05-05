import {useEffect, useState} from "react";
import {getOrders, getOrderDetail} from "../../../api/OrdersApi.ts";
import type {Order, OrderItem} from "../../../types/order.ts";
import OrderModal from "../../../components/orders/OrderModal.tsx";

export default function OrdersPage(){

    const [orders, setOrders] = useState<Order[]>([])
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [items, setItems] = useState<OrderItem[]>([])

    const [orderNumber, setOrderNumber] = useState("")
    const [status, setStatus] = useState("")
    const [customerName, setCustomerName] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const data = await getOrders();
            setOrders(data);
        };
        fetchData();
    }, []);

    const handleFilter = async () => {
        const data = await getOrders(
            orderNumber,
            status,
            customerName
        );
        setOrders(data);
    }

    const openOrder = async (order: Order) => {
        const data = await getOrderDetail(order.orderNumber)
        setItems(data)
        setSelectedOrder(order)
    }

    return(
        <div className="container-fluid">
            <h1>Objednávky</h1>

            <div className="row g-2 mb-4">
                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="Číslo objednávky"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Vše</option>
                        <option value="ZADÁNO">ZADÁNO</option>
                        <option value="UVOLNĚNO">UVOLNĚNO</option>
                        <option value="DOKONČENO">DOKONČENO</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <input
                        className="form-control"
                        placeholder="Název zákazníka"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                </div>

                <div className="col-md-1 d-grid">
                    <button
                        className="btn btn-primary"
                        onClick={handleFilter}
                    >
                        Filtrovat
                    </button>
                </div>
            </div>

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
                    items={items} onClose={() => setSelectedOrder(null)}
                />
            )}
        </div>
    )
}