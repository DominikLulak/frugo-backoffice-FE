import {useEffect, useState} from "react";
import {getProducts} from "../../../api/ProductApi.ts";
import type {Product} from "../../../types/product.ts";

type StockStatus = "ALL" | "OK" | "LOW" | "ORDER";

export default function ProductsPage(){

    const [products, setProducts] = useState<Product[]>([]);

    const [category, setCategory] = useState("");
    const [productType, setProductType] = useState("");
    const [productCode, setProductCode] = useState("");

    const [stockStatus, setStockStatus] = useState<StockStatus>("ALL");

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts();
            setProducts(data);
        };

        fetchData();
    }, []);

    const handleFilter = async () => {
        const data = await getProducts(
            category,
            productType,
            productCode
        );

        setProducts(data);
    };

    const getStockStatus = (product: Product): StockStatus => {

        if(product.availableStock <= product.minimumStock){
            return "ORDER";
        }
        if(product.availableStock <= product.reorderPoint){
            return "LOW";
        }

        return "OK";
    }

    const getRowClass = (product: Product) => {

        const status = getStockStatus(product);

        if(status === "ORDER"){
            return "table-danger";
        }
        if(status === "LOW"){
            return "table-warning";
        }

        return "";
    };

    const getStockStatusLabel = (product: Product) => {

        const status = getStockStatus(product);

        if (status === "ORDER") {
            return "🔴 Objednat";
        }

        if (status === "LOW") {
            return "🟠 Dochází";
        }

        return "🟢 Dostatek";
    };

    const filteredProducts = products.filter((product) => {
        if(stockStatus === "ALL"){
            return true;
        }

        return getStockStatus(product) === stockStatus;
    })

    return(
        <div className="container-fluid">

            <h1>Produkty</h1>

            <div className="row g-2 mb-4">

                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="Kategorie"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="Typ produktu"
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="Kod produktu"
                        value={productCode}
                        onChange={(e) => setProductCode(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <select
                        className="form-control"
                        value={stockStatus}
                        onChange={(e) =>
                            setStockStatus(e.target.value as StockStatus)
                        }
                    >
                        <option value="ALL">Vsechny stavy</option>
                        <option value="OK">Dostatek</option>
                        <option value="LOW">Dochazi</option>
                        <option value="ORDER">Objednat</option>
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
                        <th>Kod produktu</th>
                        <th>Kategorie</th>
                        <th>Typ produktu</th>
                        <th>Nazev</th>
                        <th>Cena / kg</th>
                        <th>Trvanlivost</th>
                        <th>V prodeji</th>
                        <th>Na sklade</th>
                        <th>Stav skladu</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredProducts.map((product) => (
                        <tr
                            key={product.id}
                            className={getRowClass(product)}
                        >
                            <td>{product.productCode}</td>
                            <td>{product.categoryCode}</td>
                            <td>{product.productType}</td>
                            <td>{product.productName}</td>
                            <td>{product.pricePerUnit} Kc</td>
                            <td>{product.shelfLifeDays}</td>
                            <td>{product.forSale ? "Ano" : "Ne"}</td>
                            <td>{product.availableStock}</td>
                            <td>{getStockStatusLabel(product)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}