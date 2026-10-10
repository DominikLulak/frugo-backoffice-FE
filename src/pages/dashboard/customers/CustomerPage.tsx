import {useState} from "react";
import {getCustomerDetail} from "../../../api/CustomerApi.ts";
import type {Customer, CustomerDetail} from "../../../types/customer.ts";
import CustomerModal from "../../../components/customers/CustomerModal.tsx";
import CustomerEditModal from "../../../components/customers/CustomerEditModal.tsx";
import ConfirmDeleteModal from "../../../components/common/modal/ConfirmDeleteModal.tsx";
import CustomerFilters from "../../../components/customers/CustomerFilters.tsx";
import PageHeader from "../../../components/common/PageHeader.tsx";
import CustomerTable from "../../../components/customers/CustomerTable.tsx";
import useCustomers from "../../../hooks/customers/useCustomers.ts";
import useDeleteCustomer from "../../../hooks/customers/useDeleteCustomer.ts";

export default function CustomerPage(){
    const {
        customers,
        filters,
        updateFilters,
        fetchCustomers,
        loading,
        loadError
    } = useCustomers();

    const {
        customerToDelete,
        deleting,
        deleteError,
        openDeleteModal,
        closeDeleteModal,
        handleDelete
    } = useDeleteCustomer(() => fetchCustomers(true, filters))

    const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetail | null>(null)

    const [showModal, setShowModal] = useState(false)
    const [editingCustomer, setEditingCustomer] = useState<CustomerDetail | null>(null)


    const handleFilter = async () => {
        await fetchCustomers(true, filters)
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

    return(
        <div className="container-fluid">
            <PageHeader
                title="Zakaznici"
                actionLabel="Pridat zakaznika"
                onAction={openCreateModal}
            />

            <CustomerFilters
                name={filters.name}
                companyId={filters.companyId}
                countryCode={filters.countryCode}
                city={filters.city}
                postalCode={filters.postalCode}
                registered={filters.registered}
                onNameChange={(value) => updateFilters("name", value)}
                onCompanyIdChange={(value) => updateFilters("companyId", value)}
                onCountryCodeChange={(value) => updateFilters("countryCode", value)}
                onCityChange={(value) => updateFilters("city", value)}
                onPostalCodeChange={(value) => updateFilters("postalCode", value)}
                onRegisteredChange={(value) => updateFilters("registered", value)}
                onSubmit={handleFilter}
            />

            <CustomerTable
                customers={customers}
                onOpen={openCustomer}
                onEdit={openEditingModal}
                onDelete={openDeleteModal}
                loading={loading}
                error={loadError}
            />



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
                        await fetchCustomers(true, filters)
                    }}
                />
            )}

            <CustomerEditModal
                key={`${showModal}-${editingCustomer?.id ?? "new"}`}
                show={showModal}
                customer={editingCustomer}
                onClose={closeModal}
                onSaved={() => fetchCustomers(true, filters)}
            />

            {customerToDelete && (
                <ConfirmDeleteModal
                    show={true}
                    title="Odstranit zakaznika"
                    description="Opravdu chcete odstranit zakaznika?"
                    itemName={customerToDelete?.name}
                    loading={deleting}
                    error={deleteError}
                    onClose={closeDeleteModal}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    )
}