import {useEffect, useState} from "react";
import type {Supplier} from "../../../types/supplier.ts";
import {deleteSupplier, getSuppliers, setSupplierActive} from "../../../api/SupplierApi.ts";
import SupplierModal from "../../../components/purchaseOrders/SupplierModal.tsx";

export default function SupplierPage(){
    const [suppliers, setSuppliers] = useState<Supplier[]>([])

    const [name, setName] = useState("")
    const [internalCode, setInternalCode] = useState("")
    const [active, setActive] = useState<boolean | null>(null)

    const [showModal, setShowModal] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)

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

    const handleDelete = async (supplier: Supplier) => {
        const confirmed = window.confirm(
            `Opravdu chcete smazat dodavatele "${supplier.name}"?`
        )
        if(!confirmed){
            return
        }

        try{
            setError("")

            await deleteSupplier(supplier.id)

            await fetchSuppliers()
        } catch (error){
            console.error(error)

            setError(
                "Dodavatele se nepodarilo smazat. " +
                "Mozna je pouzity v nakupni objednavce."
            )
        }
    }

    return(
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Dodavatele</h1>

                <button
                    className="btn btn-success"
                    onClick={openCreateModal}
                >
                    + Pridat dodavatele
                </button>
            </div>

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

            <table className="table">
                <thead>
                <tr>
                    <th>Nazev</th>
                    <th>Internal code</th>
                    <th>Aktivni</th>
                    <th>Akce</th>
                </tr>
                </thead>

                <tbody>
                {suppliers.map(supplier => (
                    <tr key={supplier.id}>
                        <td>{supplier.name}</td>
                        <td>{supplier.internalCode}</td>
                        <td>{supplier.active ? "Ano" : "Ne"}</td>
                        <td>
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => openEditModal(supplier)}
                                >
                                    ✏ Upravit
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={() => handleToggleActive(supplier)}
                                >
                                    {supplier.active
                                        ? "✓ Deaktivovat"
                                        : "✓ Aktivovat"
                                    }
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleDelete(supplier)}
                                >
                                    🗑 Smazat
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <SupplierModal
                key={`${showModal}-${editingSupplier?.id ?? "new"}`}
                show={showModal}
                supplier={editingSupplier}
                onClose={closeModal}
                onSaved={fetchSuppliers}
            />
        </div>
    )
}