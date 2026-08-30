import {useEffect, useState} from "react";
import {getStockItemDetail} from "../../api/StockApi.ts";
import type {StockItemDetail} from "../../types/stock.ts";
import "../modal.css";

type Props = {
    id: number;
    onClose: () => void;
};

export default function WarehouseItemModal({id, onClose}: Props){

    const [item, setItem] = useState<StockItemDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchData = async () => {
            try{
                const data = await getStockItemDetail(id);
                setItem(data);
            }catch{
                setError("Nepodarilo se nacist detail skladove polozky!");
            }finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return(
        <div className="modal-backdrop-custom" onClick={onClose}>

            <div
                className="modal-custom"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="modal-content-custom">

                    <div className="modal-header">
                        <h5>
                            Detail skladove polozky
                        </h5>
                        <button
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>

                    <div className="modal-body">

                        {loading && (
                            <p>Nacitani...</p>
                        )}

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        {item && (
                            <>
                                <h6>Produkt</h6>

                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th>Kategorie</th>
                                            <td>{item.categoryCode}</td>
                                        </tr>

                                        <tr>
                                            <th>Typ produktu</th>
                                            <td>{item.productType}</td>
                                        </tr>

                                        <tr>
                                            <th>Nazev</th>
                                            <td>{item.productName}</td>
                                        </tr>

                                        <tr>
                                            <th>Kod produktu</th>
                                            <td>{item.productCode}</td>
                                        </tr>

                                        <tr>
                                            <th>ETI cislo</th>
                                            <td>{item.etiNumber}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h6>Skladova polozka</h6>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th>Typ baleni</th>
                                            <td>{item.packagingType}</td>
                                        </tr>

                                        <tr>
                                            <th>Mnozstvi v baleni</th>
                                            <td>{item.quantityPerPackage + " kg"}</td>
                                        </tr>

                                        <tr>
                                            <th>Typ podbaleni</th>
                                            <td>{item.subpackageType ?? "-"}</td>
                                        </tr>

                                        <tr>
                                            <th>Mnozstvi v podbaleni</th>
                                            <td>{item.quantityPerSubpackage ?? "-"}</td>
                                        </tr>

                                        <tr>
                                            <th>Mnozstvi</th>
                                            <td>{item.quantity + " kg"}</td>
                                        </tr>

                                        <tr>
                                            <th>Rezervovano</th>
                                            <td>{item.allocatedQuantity + " kg"}</td>
                                        </tr>

                                        <tr>
                                            <th>Volne mnozstvi</th>
                                            <td>{item.availableQuantity + " kg"}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h6>Puvod a expirace</h6>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th>Zeme puvodu</th>
                                            <td>{item.countryOfOrigin}</td>
                                        </tr>

                                        <tr>
                                            <th>Prijato</th>
                                            <td>{item.receivedAt}</td>
                                        </tr>

                                        <tr>
                                            <th>Expirace</th>
                                            <td>{item.expirationDate}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h6>Umisteni</h6>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th>Sklad</th>
                                            <td>{item.warehouseCode}</td>
                                        </tr>

                                        <tr>
                                            <th>Lokace</th>
                                            <td>{item.locationCode}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}