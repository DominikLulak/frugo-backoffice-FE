import type {Customer} from "../../types/customer.ts";

type Props = {
    customers: Customer[];
    onOpen: (customer: Customer) => void;
    onEdit: (customer: Customer) => void;
    onDelete: (customer: Customer) => void;
    loading?: boolean;
    error?: string;
}

export default function CustomerTable({
    customers,
    onOpen,
    onEdit,
    onDelete,
    loading,
    error
}:Props){
    return(
        <div className="table-responsive">

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {loading ? (
                <p>Nacitam zakazniky...</p>
            ): (
                <table className="table">
                    <thead>
                    <tr>
                        <th>Název / Jméno zákazníka</th>
                        <th>IČO</th>
                        <th>Země</th>
                        <th>Město</th>
                        <th>PSČ</th>
                        <th>Registrovaný</th>
                        <th>Akce</th>
                    </tr>
                    </thead>

                    <tbody>
                    {customers.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="text-center py-4">
                                Nebyli nalezeni zadni zakaznici
                            </td>
                        </tr>
                    ) : (
                        customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>{customer.companyId ?? "-"}</td>
                                <td>{customer.countryCode}</td>
                                <td>{customer.city}</td>
                                <td>{customer.postalCode}</td>
                                <td>{customer.registered ? "Ano" : "Ne"}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => onOpen(customer)}
                                        >
                                            Detail
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-warning"
                                            onClick={() => onEdit(customer)}
                                        >
                                            ✏ Upravit
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => onDelete(customer)}
                                        >
                                            🗑 Smazat
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            )}
        </div>
    )
}