import {useEffect, useState} from "react";
import type {Supplier} from "../../../types/supplier.ts";
import {getSuppliers} from "../../../api/SupplierApi.ts";

export default function SupplierPage(){
    const [suppliers, setSuppliers] = useState<Supplier[]>([])

    const [name, setName] = useState("")
    const [internalCode, setInternalCode] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSuppliers();
            setSuppliers(data)
        }
        fetchData()
    }, []);

    const handleFilter = async () => {
        const data = await getSuppliers(
            name,
            internalCode
        )
        setSuppliers(data)
    }

    return(
        <div className="container-fluid">
            <h1>Dodavatele</h1>

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
                </tr>
                </thead>

                <tbody>
                {suppliers.map(supplier => (
                    <tr key={supplier.id}>
                        <td>{supplier.name}</td>
                        <td>{supplier.internalCode}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}