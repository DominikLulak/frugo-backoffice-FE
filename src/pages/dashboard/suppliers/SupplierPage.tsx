import {useEffect, useState} from "react";
import type {Supplier} from "../../../types/supplier.ts";
import {deleteSupplier, getSuppliers, setSupplierActive} from "../../../api/SupplierApi.ts";
import SupplierModal from "../../../components/purchaseOrders/SupplierModal.tsx";
import ConfirmDeleteModal from "../../../components/common/modal/ConfirmDeleteModal.tsx";
import PageHeader from "../../../components/common/PageHeader.tsx";
import Table, {type TableColumn} from "../../../components/common/Table.tsx";
import EditButton from "../../../components/common/buttons/EditButton.tsx";
import DeleteButton from "../../../components/common/buttons/DeleteButton.tsx";

export default function SupplierPage(){
    const [suppliers, setSuppliers] = useState<Supplier[]>([])

    const [name, setName] = useState("")
    const [internalCode, setInternalCode] = useState("")
    const [active, setActive] = useState<boolean | null>(null)

    const [showModal, setShowModal] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)

    const [supplierToDelete, setSupplierToDelte] = useState<Supplier | null>(null)
    const [deleting, setDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState("")

    const [error, setError] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSuppliers()
            setSuppliers(data)
        }
        fetchData()
    }, []);

    const fetchSuppliers = async () => {
        const data = await getSuppliers(
            name,
            internalCode,
            active
        )
        setSuppliers(data)
    }

    const handleFilter = async () => {
        await fetchSuppliers()
    }

    const openCreateModal = () => {
        setEditingSupplier(null)
        setShowModal(true)
    }

    const openEditModal = (supplier: Supplier) => {
        setEditingSupplier(supplier)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setEditingSupplier(null)
    }

    const handleToggleActive = async (supplier: Supplier) => {
        try{
            setError("")

            await setSupplierActive(
                supplier.id,
                !supplier.active
            );
            await fetchSuppliers()
        } catch (error){
            console.error(error)
            setError("Nepodarilo se zmenit stav dodavatele")
        }
    }

    const openDeleteModal = (supplier: Supplier) => {
        setDeleteError("")
        setSupplierToDelte(supplier)
    }

    const handleDelete = async () => {
        if(!supplierToDelete){
            return
        }

        try{
            setDeleting(true)
            setDeleteError("")

            await deleteSupplier(supplierToDelete.id)
            setSupplierToDelte(null)
            await fetchSuppliers()
        }catch{
            setDeleteError(
                "Dodavatele se nepodarilo smazat. " +
                "Mozna je pouzit v nakupni objednavce.")
        }finally {
            setDeleting(false)
        }
    }

    const columns: TableColumn<Supplier>[] = [
        {
            key: "name",
            header: "Nazev",
            render: (supplier) => supplier.name
        },
        {
            key: "internalCode",
            header: "Internal code",
            render: (supplier) => supplier.internalCode
        },
        {
            key: "active",
            header: "Aktivni",
            render: (supplier) => supplier.active ? "Ano" : "Ne"
        },
        {
            key: "actions",
            header: "Akce",
            render: (supplier) => (
                <div className="d-flex gap-2">
                    <EditButton
                        onClick={() => openEditModal(supplier)}
                    />
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleToggleActive(supplier)}
                    >
                        {supplier.active
                            ? "✓ Deaktivovat"
                            : "✓ Aktivovat"
                        }
                    </button>
                    <DeleteButton
                        onClick={() => openDeleteModal(supplier)}
                    />
                </div>
            )
        }
    ]

    return(
        <div className="container-fluid">
            <PageHeader
                title="Seznam dodavatelu"
                actionLabel="Pridat dodavatele"
                onAction={openCreateModal}
            />

            {error &&(
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="row g-2 mb-4">
                <div className="col-md-4">
                    <input
                        className="form-control"
                        placeholder="Nazev dodavatele"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        className="form-control"
                        placeholder="Internal code"
                        value={internalCode}
                        onChange={(e) => setInternalCode(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <select
                        className="form-control"
                        value={active === null ?"" : String(active)}
                        onChange={(e) => {
                            if(e.target.value === ""){
                                setActive(null)
                        }else{
                                setActive(e.target.value === "true")
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

            <Table<Supplier>
                columns={columns}
                data={suppliers}
                getRowKey={(supplier) => supplier.id}
            />

            <SupplierModal
                key={`${showModal}-${editingSupplier?.id ?? "new"}`}
                show={showModal}
                supplier={editingSupplier}
                onClose={closeModal}
                onSaved={fetchSuppliers}
            />

            {supplierToDelete && (
                <ConfirmDeleteModal
                    show={supplierToDelete !== null}
                    title="Odstranit dodavatele"
                    description="Opravdu chcete odstranit dodavatele"
                    itemName={supplierToDelete?.name ?? ""}
                    loading={deleting}
                    error={deleteError}
                    onClose={() => setSupplierToDelte(null)}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    )
}