import {useEffect, useState} from "react";
import type {Warehouse, WarehouseDetail} from "../../../types/warehouse.ts";
import {getWarehouseDetail, getWarehouses} from "../../../api/WarehouseApi.ts";
import WarehouseModal from "../../../components/warehouses/WarehouseModal.tsx";

export default function WarehousePage(){
    const [warehouses, setWarehouses] = useState<Warehouse[]>([])
    const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseDetail | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getWarehouses();
            setWarehouses(data)
        }
        fetchData()
    }, []);

    const openWarehouse = async (warehouse: Warehouse) => {
        const data = await getWarehouseDetail(warehouse.id)
        setSelectedWarehouse(data)
    }

    return(
        <div className="container-fluid">
            <h1>Seznam skladu</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>Kod skladu</th>
                        <th>Nazev skladu</th>
                        <th>Popis skladu</th>
                    </tr>
                </thead>

                <tbody>
                {warehouses.map(warehouse => (
                    <tr key={warehouse.id}>
                        <td>
                            <button
                                className="btn btn-link p-0"
                                onClick={() => openWarehouse(warehouse)}
                            >
                                {warehouse.code}
                            </button>
                        </td>
                        <td>{warehouse.name}</td>
                        <td>{warehouse.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedWarehouse && (
                <WarehouseModal
                    warehouse={selectedWarehouse}
                    onClose={() => setSelectedWarehouse(null)}
                />
            )}
        </div>
    )
}