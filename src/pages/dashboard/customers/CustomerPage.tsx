import {useEffect, useState} from "react";
import {getCustomerDetail, getCustomers} from "../../../api/CustomerApi.ts";
import type {Customer, CustomerDetail} from "../../../types/customer.ts";
import CustomerModal from "../../../components/customers/CustomerModal.tsx";

export default function CustomerPage(){
    const [customers, setCustomers] = useState<Customer[]>([])
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetail | null>(null)

    const [name, setName] = useState("")
    const [companyId, setCompanyId] = useState("")
    const [countryCode, setCountryCode] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [registered, setRegistered] = useState<boolean | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCustomers();
            setCustomers(data)
        }
        fetchData()
    }, []);

    const handleFilter = async () => {
        const data = await getCustomers(
            name,
            companyId,
            countryCode,
            city,
            postalCode,
            registered
        )
        setCustomers(data)
    }

    const openCustomer = async (customer: Customer) => {
        const data = await getCustomerDetail(customer.id)
        setSelectedCustomer(data)
    }

    return(
        <div className="container-fluid">
            <h1>Zákazníci</h1>

            <div className="row g-2 mb-4">
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Nazev / Jmeno zakaznika"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="ICO"
                        value={companyId}
                        onChange={(e) => setCompanyId(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Zeme"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="Mesto"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <input
                        className="form-control"
                        placeholder="PSC"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <select
                        className="form-control"
                        value={registered === null ?"" : String(registered)}
                        onChange={(e) => {
                            if(e.target.value === ""){
                                setRegistered(null)
                            }else{
                                setRegistered(e.target.value === "true")
                            }
                        }}
                    >
                        <option value="">Vse</option>
                        <option value="true">Ano</option>
                        <option value="false">Ne</option>
                    </select>
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
                    <th>Nazev / Jmeno zakaznika</th>
                    <th>ICO</th>
                    <th>Zeme</th>
                    <th>Mesto</th>
                    <th>PSC</th>
                    <th>Registrovany</th>
                </tr>
                </thead>

                <tbody>
                {customers.map(customer => (
                    <tr key={customer.id}>
                        <td>
                            <button
                                className="btn btn-link p-0"
                                onClick={() => openCustomer(customer)}
                            >
                                {customer.name}
                            </button>
                        </td>
                        <td>{customer.companyId ?? "-"}</td>
                        <td>{customer.countryCode}</td>
                        <td>{customer.city}</td>
                        <td>{customer.postalCode}</td>
                        <td>{customer.registered ? "Ano" : "Ne"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedCustomer && (
                <CustomerModal
                    customer={selectedCustomer}
                    onClose={() => setSelectedCustomer(null)}
                />
            )}
        </div>
    )
}