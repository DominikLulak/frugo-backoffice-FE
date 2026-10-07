import type {Pallet, PalletWarehouseItem} from "../../types/pallet.ts";

type Props = {
    pallet: Pallet;
    items: PalletWarehouseItem[];
    onClose: () => void;
}

export default function PalletModal({
    pallet,
    items,
    onClose
}:Props){
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
                        <h5>Paleta {pallet.palletNumber}</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body">
                        <h6>Udaje palety</h6>
                        <table className="table table-sm">
                            <tbody>
                                <tr>
                                    <th>ETI cislo</th>
                                    <td>{pallet.palletNumber}</td>
                                </tr>
                                <tr>
                                    <th>Lokace</th>
                                    <td>{pallet.locationCode}</td>
                                </tr>
                                <tr>
                                    <th>Uzavrena</th>
                                    <td>{pallet.closed ? "Ano" : "Ne"}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h6 className="mt-4">Obsah palety</h6>
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Produkt</th>
                                    <th>Kategorie</th>
                                    <th>Typ produktu</th>
                                    <th>Nazev</th>
                                    <th>ETI Cislo</th>
                                    <th>Mnozstvi</th>
                                </tr>
                            </thead>

                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.productCode}</td>
                                    <td>{item.categoryCode}</td>
                                    <td>{item.productType}</td>
                                    <td>{item.productName}</td>
                                    <td>{item.etiNumber}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}