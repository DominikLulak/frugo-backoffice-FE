import {useEffect, useState} from "react";
import {getOrders, getOrderDetail} from "../../../api/OrdersApi.ts";
import type {Order, OrderItem} from "../../../types/order.ts";
import OrderModal from "../../../components/orders/OrderModal.tsx";

export default function OrdersPage(){

    const [orders, setOrders] = useState<Order[]>([])
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)
    const [selectedOrderNumber, setSelectedOrderNumber] = useState<string | null>(null)
    const [items, setItems] = useState<OrderItem[]>([])

    const [orderNumber, setOrderNumber] = useState("")
    const [customerName, setCustomerName] = useState("")
    const [statusCode, setStatusCode] = useState("")

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
            customerName,
            statusCode
        );
        setOrders(data);
    }

    const openOrder = async (order: Order) => {
        const data = await getOrderDetail(order.id)
        setItems(data)
        setSelectedOrderId(order.id)
        setSelectedOrderNumber(order.orderNumber)
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
                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="Nazev zakaznika"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <select
                        className="form-control"
                        value={statusCode}
                        onChange={(e) => setStatusCode(e.target.value)}
                    >
                        <option value="">Vse</option>
                        <option value="ENTERED">ENTERED</option>
                        <option value="RELEASED">RELEASED</option>
                        <option value="BLOCKED">BLOCKED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                        <option value="FINISHED">FINISHED</option>
                    </select>
                </div>

                <div className="col-md-3 d-grid">
                    <button
                        className="btn btn-primary"
                        onClick={handleFilter}
                    >
                        Filtrovat
                    </button>
                </div>
            </div>

            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>Číslo objednávky</th>
                    <th>Zakaznik</th>
                    <th>Vytvoreno</th>
                    <th>Stav</th>
                </tr>
                </thead>

                <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>
                            <button
                                className="btn btn-link p-0"
                                onClick={() => openOrder(order)}
                            >
                                {order.orderNumber}
                            </button>
                        </td>
                        <td>{order.customerName}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.statusCode}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedOrderId !== null && selectedOrderNumber && (
                <OrderModal
                    orderNumber={selectedOrderNumber}
                    items={items}
                    onClose={() => {
                        setSelectedOrderId(null);
                        setSelectedOrderNumber(null);
                    }}
                />
            )}
        </div>
    )
}