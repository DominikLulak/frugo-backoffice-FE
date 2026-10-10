import {useEffect, useState} from "react";
import {deleteCustomer, getCustomerDetail, getCustomers} from "../../../api/CustomerApi.ts";
import type {Customer, CustomerDetail} from "../../../types/customer.ts";
import CustomerModal from "../../../components/customers/CustomerModal.tsx";
import CustomerEditModal from "../../../components/customers/CustomerEditModal.tsx";
import ConfirmDeleteModal from "../../../components/layout/ConfirmDeleteModal.tsx";

export default function CustomerPage(){
    const [customers, setCustomers] = useState<Customer[]>([])
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetail | null>(null)

    const [name, setName] = useState("")
    const [companyId, setCompanyId] = useState("")
    const [countryCode, setCountryCode] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [registered, setRegistered] = useState<boolean | null>(null)

    const [showModal, setShowModal] = useState(false)
    const [editingCustomer, setEditingCustomer] = useState<CustomerDetail | null>(null)

    const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null)
    const [deleting, setDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCustomers();
            setCustomers(data)
        }
        fetchData()
    }, []);

    const fetchCustomers = async () => {
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

    const handleFilter = async () => {
        await fetchCustomers()
    }

    const openCustomer = async (customer: Customer) => {
        const data = await getCustomerDetail(customer.id)
        setSelectedCustomer(data)
    }

    const openCreateModal = () => {
        setEditingCustomer(null)
        setShowModal(true)
    }

    const openEditingModal = async (customer: Customer) => {
        const data = await getCustomerDetail(customer.id)
        setEditingCustomer(data)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setEditingCustomer(null)
    }

    const openDeleteModal = (customer: Customer) => {
        setDeleteError("")
        setCustomerToDelete(customer)
    }

    const handleDelete = async () => {
        if(!customerToDelete){
            return
        }

        try{
            setDeleting(true)
            setDeleteError("")

            await deleteCustomer(customerToDelete.id)
            setCustomerToDelete(null)
            await fetchCustomers()
        }catch{
            setDeleteError(
                "Zakaznika se nepodarilo smazat. " +
                "Mozna je pozit v objednavce."
            )
        }finally {
            setDeleting(false)
        }
    }

    return(
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Zákazníci</h1>

                <button
                    className="btn btn-success"
                    onClick={openCreateModal}
                >
                    + Pridat zakaznika
                </button>
            </div>

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
                    <th>Akce</th>
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
                        <td>
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => openEditingModal(customer)}
                                >
                                    ✏ Upravit
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => openDeleteModal(customer)}
                                >
                                    🗑 Smazat
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedCustomer && (
                <CustomerModal
                    customerId={selectedCustomer.id}
                    customer={selectedCustomer}
                    onClose={() => setSelectedCustomer(null)}
                    onSaved={async () => {
                        const updateCustomer = await getCustomerDetail(
                            selectedCustomer.id
                        )
                        setSelectedCustomer(updateCustomer)
                        await fetchCustomers()
                    }}
                />
            )}

            <CustomerEditModal
                key={`${showModal}-${editingCustomer?.id ?? "new"}`}
                show={showModal}
                customer={editingCustomer}
                onClose={closeModal}
                onSaved={fetchCustomers}
            />

            {customerToDelete && (
                <ConfirmDeleteModal
                    show={customerToDelete !== null}
                    title="Odstranit zakaznika"
                    description="Opravdu chcete odstranit zakaznika?"
                    itemName={customerToDelete?.name ?? ""}
                    loading={deleting}
                    error={deleteError}
                    onClose={() => setCustomerToDelete(null)}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    )
}