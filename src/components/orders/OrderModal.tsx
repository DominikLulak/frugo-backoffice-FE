import "../modal.css"
import type {OrderItem} from "../../types/order.ts";

type Props = {
    orderNumber: string;
    items: OrderItem[];
    onClose: () => void;
};

export default function OrderModal({orderNumber, items, onClose}: Props){
    return(
        <div
            className="modal-backdrop-custom"
            onClick={onClose}
        >
            <div
                className="modal-custom"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content-custom">

                    <div className="modal-header">

                        <h5>
                            Objednavka {orderNumber}
                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Kategorie</th>
                                    <th>Typ</th>
                                    <th>Nazev</th>
                                    <th>ETI</th>
                                    <th>Mnozstvi</th>
                                    <th>Potvrzene mnozstvi</th>
                                    <th>Stav</th>
                                </tr>
                            </thead>

                            <tbody>
                            {items.map((item, index) => (

                                <tr key={index}>
                                    <td>{item.warehouseItemCategoryCode}</td>
                                    <td>{item.warehouseItemType}</td>
                                    <td>{item.warehouseItemName}</td>
                                    <td>{item.etiNumber}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.pickedQuantity}</td>
                                    <td>{item.statusCode}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}