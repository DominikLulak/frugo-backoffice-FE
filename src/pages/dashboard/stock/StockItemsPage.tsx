import {useEffect, useState} from "react";
import {getStockItems} from "../../../api/StockApi.ts";
import type {StockItem} from "../../../types/stock.ts";
import WarehouseItemModal from "../../../components/stock/WarehouseItemModal.tsx";

export default function StockItemsPage(){

    const [items, setItems] = useState<StockItem[]>([])
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    const [productCode, setProductCode] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [productType, setProductType] = useState("");
    const [etiNumber, setEtiNumber] = useState("");
    const [warehouseCode, setWarehouseCode] = useState("");

    useEffect(() => {
        const fetchData = async () =>{
            const data = await getStockItems();
            setItems(data);
        };
        fetchData();
    }, []);

    const handleFilter = async () => {
        const data = await getStockItems(
            productCode,
            name,
            category,
            productType,
            etiNumber,
            warehouseCode
        );
        setItems(data)
    }

    return(
        <div className="container-fluid">
            <h1>Položky na skladě</h1>

            <div className="row g-2 mb-4">
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Kod produktu"
                        value={productCode}
                        onChange={(e) => setProductCode(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Kategorie"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Nazev"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Typ produktu"
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="ETI cislo"
                        value={etiNumber}
                        onChange={(e) => setEtiNumber(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Kod skladu"
                        value={warehouseCode}
                        onChange={(e) => setWarehouseCode(e.target.value)}
                    />
                </div>

                <div className="col-md-2 d-grid">
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
                        <th>Kategorie</th>
                        <th>Typ</th>
                        <th>Nazev</th>
                        <th>Kod produktu</th>
                        <th>ETI cislo</th>
                        <th>Mnozstvi</th>
                        <th>Rezervovano</th>
                        <th>Volne</th>
                        <th>Expirace</th>
                        <th>Sklad</th>
                        <th>Lokace</th>
                    </tr>
                </thead>

                <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.categoryCode}</td>
                        <td>{item.productType}</td>
                        <td>{item.productName}</td>
                        <td>{item.productCode}</td>
                        <td>
                            <button
                                className="btn btn-link p-0"
                                onClick={() => setSelectedItemId(item.id)}
                            >
                                {item.etiNumber}
                            </button>
                        </td>
                        <td>{item.quantity + " kg"}</td>
                        <td>{item.allocatedQuantity + " kg"}</td>
                        <td>{item.availableQuantity + " kg"}</td>
                        <td>{item.expirationDate}</td>
                        <td>{item.warehouseCode}</td>
                        <td>{item.locationCode}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedItemId !== null && (
                <WarehouseItemModal
                    id={selectedItemId}
                    onClose={() => setSelectedItemId(null)}
                />
            )}
        </div>
    )
}