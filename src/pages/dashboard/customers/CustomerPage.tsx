import {useState} from "react";
import {getCustomerDetail} from "../../../api/CustomerApi.ts";
import type {Customer, CustomerDetail} from "../../../types/customer.ts";
import CustomerModal from "../../../components/customers/modal/CustomerModal.tsx";
import CustomerEditModal from "../../../components/customers/modal/CustomerEditModal.tsx";
import ConfirmDeleteModal from "../../../components/common/modal/ConfirmDeleteModal.tsx";
import CustomerFilters from "../../../components/customers/CustomerFilters.tsx";
import PageHeader from "../../../components/common/PageHeader.tsx";
import useCustomers from "../../../hooks/customers/useCustomers.ts";
import useDeleteCustomer from "../../../hooks/customers/useDeleteCustomer.ts";
import Table, {type TableColumn} from "../../../components/common/Table.tsx";
import DetailButton from "../../../components/common/buttons/DetailButton.tsx";
import EditButton from "../../../components/common/buttons/EditButton.tsx";
import DeleteButton from "../../../components/common/buttons/DeleteButton.tsx";

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

    const columns: TableColumn<Customer>[] = [
        {
            key: "name",
            header: "Nazev / Jmeno zakaznika",
            render: (customer) => customer.name
        },
        {
            key: "companyId",
            header: "ICO",
            render: (customer) => customer.companyId ?? "-"
        },
        {
            key: "countryCode",
            header: "Zeme",
            render: (customer) => customer.countryCode
        },
        {
            key: "city",
            header: "Mesto",
            render: (customer) => customer.city
        },
        {
            key: "postalCode",
            header: "PSC",
            render: (customer) => customer.postalCode
        },
        {
            key: "registered",
            header: "Registrovany",
            render: (customer) => customer.registered ? "Ano" : "Ne"
        },{
            key: "actions",
            header: "Akce",
            render: (customer) => (
                <div className="d-flex gap-2">
                    <DetailButton
                        onClick={() => openCustomer(customer)}
                    />
                    <EditButton
                        onClick={() => openEditingModal(customer)}
                    />
                    <DeleteButton
                        onClick={() => openDeleteModal(customer)}
                    />
                </div>
            )
        },
    ]

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

            <Table<Customer>
                columns={columns}
                data={customers}
                getRowKey={(customer) => customer.id}
                loading={loading}
                error={loadError}
                loadingText="Nacitam zakazniky..."
                emptyMessage="Nebyli nalezeni zadni zakaznici"
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