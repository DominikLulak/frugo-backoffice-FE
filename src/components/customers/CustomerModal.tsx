import "../modal.css"
import type {CustomerDetail} from "../../types/customer.ts";

type Props = {
    customer: CustomerDetail;
    onClose: () => void;
}

export default function CustomerModal({
    customer,
    onClose
}: Props){

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
                        <h5>Zakaznik {customer.name}</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body">

                        <h6>Udaje zakaznika</h6>
                        <table className="table table-sm">
                            <tbody>

                                <tr>
                                    <th>Nazev / Jmeno</th>
                                    <td>{customer.name}</td>
                                </tr>
                                <tr>
                                    <th>ICO</th>
                                    <td>{customer.companyId ?? "-"}</td>
                                </tr>
                                <tr>
                                    <th>Zeme</th>
                                    <td>{customer.countryCode}</td>
                                </tr>
                                <tr>
                                    <th>Mesto</th>
                                    <td>{customer.city}</td>
                                </tr>
                                <tr>
                                    <th>PSC</th>
                                    <td>{customer.postalCode}</td>
                                </tr>
                                <tr>
                                    <th>Ulice</th>
                                    <td>{customer.street}</td>
                                </tr>
                                <tr>
                                    <th>Cislo popisne</th>
                                    <td>{customer.houseNumber}</td>
                                </tr>
                                <tr>
                                    <th>Registrovany</th>
                                    <td>{customer.registered ? "Ano" : "Ne"}</td>
                                </tr>
                            </tbody>
                        </table>

                        <h6 className="mt-4">Kontaktni udaje</h6>

                        {customer.contacts.length === 0 ? (
                            <p>Zadny kontakt</p>
                        ): (
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Jmeno</th>
                                        <th>Telefon</th>
                                        <th>Email</th>
                                        <th>Primarni</th>
                                    </tr>
                                </thead>

                                <tbody>
                                {customer.contacts.map((contact) => (
                                    <tr key={contact.id}>
                                        <td>{contact.name}</td>
                                        <td>{contact.phoneNumber}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.primary ? "Ano" : "Ne"}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}