import "../modal.css"
import type {PalletWarehouseItem} from "../../types/shipment.ts";

type Props = {
    palletNumber: string;
    items: PalletWarehouseItem[];
    onClose: () => void;
};

export default function PalletModal({
    palletNumber,
    items,
    onClose
}:Props){

    return(
        <div
            className="modal-backdrop-custom modal-backdrop-custom-second"
            onClick={onClose}
        >
            <div
                className="modal-custom modal-custom-second"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content-custom">

                    <div className="modal-header">
                        <h5>Paleta {palletNumber}</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body">

                        <table className="table">

                            <thead>
                                <tr>
                                    <th>Kod produktu</th>
                                    <th>Kategorie</th>
                                    <th>Typ</th>
                                    <th>Nazev</th>
                                    <th>ETI</th>
                                    <th>Mnozstvi</th>
                                </tr>
                            </thead>

                            <tbody>
                            {items.map((item) => (

                                <tr key={item.etiNumber}>
                                    <td>{item.productCode}</td>
                                    <td>{item.categoryCode}</td>
                                    <td>{item.productType}</td>
                                    <td>{item.productName}</td>
                                    <td>{item.etiNumber}</td>
                                    <td>{item.quantity}</td>
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