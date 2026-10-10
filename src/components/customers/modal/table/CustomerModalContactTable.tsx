import type {CustomerContact} from "../../../../types/customer.ts";

type Props = {
    customerContacts: CustomerContact[];
    onEdit: (customerContact: CustomerContact) => void;
    onDelete: (customerContact: CustomerContact) => void;
    onCreate: () => void;
}

export default function CustomerModalContactTable({
    customerContacts,
    onEdit,
    onDelete,
    onCreate
}:Props){
    return(
        <div className="table-responsive">
            <h6 className="mt-4">Kontaktni udaje</h6>
            <button
                type="button"
                className="btn btn-success btn-sm mb-3"
                onClick={onCreate}
            >
                Pridat kontakt
            </button>

            {customerContacts.length === 0 ? (
                <p>Zadny kontakt</p>
            ): (
                <table className="table table-sm">
                    <thead>
                    <tr>
                        <th>Jmeno</th>
                        <th>Telefon</th>
                        <th>Email</th>
                        <th>Primarni</th>
                        <th>Akce</th>
                    </tr>
                    </thead>

                    <tbody>
                    {customerContacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.name}</td>
                            <td>{contact.phoneNumber}</td>
                            <td>{contact.email}</td>
                            <td>{contact.primary ? "Ano" : "Ne"}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => onEdit(contact)}
                                >
                                    Upravit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger ms-2"
                                    onClick={() => onDelete(contact)}
                                >
                                    Odstranit
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}