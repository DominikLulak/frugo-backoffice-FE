import {useEffect, useState} from "react";
import {getStockItems} from "../../../api/StockApi.ts";
import type {StockItem} from "../../../types/stock.ts";

export default function StockItemsPage(){

    const [items, setItems] = useState<StockItem[]>([])

    const [category, setCategory] = useState("")
    const [name, setName] = useState("")
    const [variant, setVariant] = useState("")

    useEffect(() => {
        const fetchData = async () =>{
            const data = await getStockItems();
            setItems(data);
        };
        fetchData();
    }, []);

    const handleFilter = async () => {
        const data = await getStockItems(
            category,
            name,
            variant
        );
        setItems(data)
    }

    const translateName = (key:string)=>{
        const map: Record<string, string>= {
            "offering-products.apples": "Jablka",
            "offering-products.bananas": "Banány",
            "offering-products.carrots": "Mrkev",
            "offering-products.parsley": "Petržel"
        }
        return map[key] || key
    }

    return(
        <div className="container-fluid">
            <h1>Položky na skladě</h1>

            <div className="row g-2 mb-4">
                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="Kategorie"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        className="form-control"
                        placeholder="Název"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        className="form-control"
                        placeholder="Varianta"
                        value={variant}
                        onChange={(e) => setVariant(e.target.value)}
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

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Kategorie</th>
                        <th>Název</th>
                        <th>Varianta</th>
                    </tr>
                </thead>

                <tbody>
                {items.map((item, i) => (
                    <tr key={i}>
                        <td>{item.category}</td>
                        <td>{translateName(item.name)}</td>
                        <td>{item.variant}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}