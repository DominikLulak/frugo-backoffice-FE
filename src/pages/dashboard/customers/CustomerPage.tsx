import {useEffect, useState} from "react";
import {getCustomers, getCustomerDetail} from "../../../api/CustomerApi.ts";
import CustomerModal from "../../../components/customers/CustomerModal.tsx";

export default function CustomerPage(){
    const [customers, setCustomers] = useState<any[]>([])
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null)

    const [customerNumber, setCustomerNumber] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCustomers();
            setCustomers(data)
        }
        fetchData()
    }, []);

    const handleFilter = async () => {
        const data = await getCustomers(
            customerNumber,
            name,
            email,
            phoneNumber
        )
        setCustomers(data)
    }

    const openCustomer = async (customer: any) => {
        const data = await getCustomerDetail(customer.customerNumber)
        setSelectedCustomer(data)
    }

    return(
        <div className="container-fluid">
            <h1>Zákazníci</h1>

            <div className="row g-2 mb-4">
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Číslo zákazníka"
                        value={customerNumber}
                        onChange={(e) => setCustomerNumber(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="Název / Jméno"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        className="form-control"
                        placeholder="Telefon"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
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

            <table className="table">
                <thead>
                <tr>
                    <th>Číslo zákazníka</th>
                    <th>Název / Jméno</th>
                    <th>E-mail</th>
                    <th>Telefon</th>
                </tr>
                </thead>

                <tbody>
                {customers.map(e => (
                    <tr key={e.customerNumber}>
                        <td
                            style={{cursor: "pointer", color: "blue"}}
                            onClick={() => openCustomer(e)}
                        >
                            {e.customerNumber}
                        </td>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.phoneNumber}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedCustomer && (
                <CustomerModal customer={selectedCustomer} onClose={() => setSelectedCustomer(null)}/>
            )}
        </div>
    )
}