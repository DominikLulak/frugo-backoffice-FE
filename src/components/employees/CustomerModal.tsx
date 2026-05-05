import "../modal.css"

type Customer = {
    customerNumber: string;
    name: string;
    country: string;
    address: string;
    executive: string;
    email: string;
    phoneNumber: string;
}

type Props = {
    customer: Customer | null;
    onClose: () => void;
}

export default function CustomerModal({customer, onClose}: Props){
    if(!customer) return null

    return(
        <>
            <div className="modal-backdrop-custom" onClick={onClose}>
                <div className="modal-custom" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content-custom">

                        <div className="modal-header">
                            <h5>Zakaznik</h5>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Cislo zakaznika</th>
                                    <th>Nazev / Jmeno</th>
                                    <th>Zeme</th>
                                    <th>Adresa</th>
                                    <th>Jednatel</th>
                                    <th>E-mail</th>
                                    <th>Telefon</th>
                                </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>{customer.customerNumber}</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.country}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.executive}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.phoneNumber}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}