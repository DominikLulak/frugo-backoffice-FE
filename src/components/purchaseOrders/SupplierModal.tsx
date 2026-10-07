import type {Supplier} from "../../types/supplier.ts";
import {useState} from "react";
import {createSupplier, updateSupplier} from "../../api/SupplierApi.ts";

interface SupplierModalProps{
    show: boolean;
    supplier: Supplier | null;
    onClose: () => void;
    onSaved: () => void;
}

export default function SupplierModal({
    show,
    supplier,
    onClose,
    onSaved
}:SupplierModalProps){
    const [name, setName] = useState(
        supplier?.name ?? ""
    )
    const [internalCode, setInternalCode] = useState(
        supplier?.internalCode ?? ""
    )

    const [error, setError] = useState("")
    const [saving, setSaving] = useState(false)

    const isEdit = supplier !== null



    if(!show){
        return null
    }

    const handleSave = async () => {
        setError("")

        if(!name.trim()){
            setError("Nazev dodavatele je povinny!")
            return
        }
        if(!internalCode.trim()){
            setError("Internal code je povinny!")
            return
        }

        try {
            setSaving(true)

            if(isEdit){
                await updateSupplier(
                    supplier.id,
                    {
                        name: name.trim(),
                        internalCode: internalCode.trim()
                    }
                )
            }else{
                await createSupplier({
                    name: name.trim(),
                    internalCode: internalCode.trim()
                })
            }
            onClose()
            onSaved()
        }catch (error){
            console.error(error)
            setError(
                isEdit
                    ? "Dodavatele se nepodarilo upravit"
                    : "Dodavatele se nepodarilo vytvorit"
            )
        } finally {
            setSaving(false)
        }
    }

    return (
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
                        <h5 className="mb-3">
                            {isEdit
                                ? "Upravit dodavatele"
                                : "Pridat dodovatele"
                            }
                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                            disabled={saving}
                        />
                    </div>

                    <div className="modal-body">
                        {error &&(
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="form-label">
                                Nazev dodavatele
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={saving}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Interni kod
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={internalCode}
                                onChange={(e) => setInternalCode(e.target.value)}
                                disabled={saving}
                            />
                        </div>
                    </div>

                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={saving}
                        >
                            Zrusit
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary m-lg-1"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving
                                ? "Ukladam"
                                : "Ulozit"
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}