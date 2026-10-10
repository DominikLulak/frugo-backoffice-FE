import "../../modal.css"
import type {CustomerContact, CustomerDetail} from "../../../types/customer.ts";
import {useState} from "react";
import CustomerContactModal from "./CustomerContactModal.tsx";
import ConfirmDeleteModal from "../../common/modal/ConfirmDeleteModal.tsx";
import useDeleteCustomerContact from "../../../hooks/customers/useDeleteCustomerContact.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import CustomerModalInfoTable from "./table/CustomerModalInfoTable.tsx";
import CustomerModalContactTable from "./table/CustomerModalContactTable.tsx";

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
        <>
            <BaseModal
                title={`Zakaznik ${customer.name}`}
                onClose={onClose}
            >
                <CustomerModalInfoTable
                    customerDetail={customer}
                />
                <CustomerModalContactTable
                    customerContacts={customer.contacts}
                    onEdit={openEditingModal}
                    onDelete={openDeleteModal}
                    onCreate={openCreateModal}
                />
            </BaseModal>

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
        </>
    )
}