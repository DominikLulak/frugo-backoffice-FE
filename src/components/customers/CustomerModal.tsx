import "../modal.css"
import type {CustomerContact, CustomerDetail} from "../../types/customer.ts";
import {useState} from "react";
import CustomerContactModal from "./CustomerContactModal.tsx";
import ConfirmDeleteModal from "../common/modal/ConfirmDeleteModal.tsx";
import useDeleteCustomerContact from "../../hooks/customers/useDeleteCustomerContact.ts";

type Props = {
    customerId: number;
    customer: CustomerDetail;
    onClose: () => void;
    onSaved: () => void;
}

export default function CustomerModal({
    customerId,
    customer,
    onClose,
    onSaved
}: Props){
    const {
        customerContactToDelete,
        deleting,
        deleteError,
        openDeleteModal,
        closeDeleteModal,
        handleDelete
    } = useDeleteCustomerContact(customerId, onSaved)

    const [showAddCustomerContactModal, setShowAddCustomerContactModal] = useState(false)
    const [editingCustomerContact, setEditingCustomerContact] = useState<CustomerContact | null>(null)

    const openCreateModal = () => {
        setEditingCustomerContact(null)
        setShowAddCustomerContactModal(true)
    }

    const openEditingModal = async (customerContact: CustomerContact) => {
        setEditingCustomerContact(customerContact)
        setShowAddCustomerContactModal(true)
    }

    const closeContactModal = () => {
        setShowAddCustomerContactModal(false)
        setEditingCustomerContact(null)
    }

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
                        <button
                            type="button"
                            className="btn btn-success btn-sm mb-3"
                            onClick={openCreateModal}
                        >
                            Pridat kontakt
                        </button>

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
                                        <th>Akce</th>
                                    </tr>
                                </thead>

                                <tbody>
                                {customer.contacts.map((contact) => (
                                    <tr key={contact.id}>
                                        <td>{contact.name}</td>
                                        <td>{contact.phoneNumber}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.primary ? "Ano" : "Ne"}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => openEditingModal(contact)}
                                            >
                                                Upravit
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger ms-2"
                                                onClick={() => openDeleteModal(contact)}
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
                </div>
            </div>

            {showAddCustomerContactModal && (
                <CustomerContactModal
                    key={editingCustomerContact?.id ?? "new"}
                    show={showAddCustomerContactModal}
                    customerId={customerId}
                    customerContact={editingCustomerContact}
                    onClose={closeContactModal}
                    onSaved={async () => {
                        closeContactModal()
                        await onSaved()
                    }}
                />
            )}

            {customerContactToDelete && (
                <ConfirmDeleteModal
                    show={true}
                    title="Odstranit kontakt"
                    description="Opravdu chcete odstranit kontakt"
                    itemName={customerContactToDelete?.name}
                    loading={deleting}
                    error={deleteError}
                    onClose={closeDeleteModal}
                    onConfirm={handleDelete}
                />
            )}

        </div>
    )
}