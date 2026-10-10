import type {CustomerDetail} from "../../types/customer.ts";
import {useEffect, useState} from "react";
import {getCountries} from "../../api/CountryApi.ts";
import type {Country} from "../../types/referenceData.ts";
import {createCustomer, updateCustomer} from "../../api/CustomerApi.ts";

type Props = {
    show: boolean;
    customer: CustomerDetail | null;
    onClose: () => void;
    onSaved: () => void;
}

export default function CustomerEditModal({
    show,
    customer,
    onClose,
    onSaved
}:Props){
    const [countries, setCountries] = useState<Country[]>([])

    const [name, setName] = useState(customer?.name ?? "")
    const [companyId, setCompanyId] = useState(customer?.companyId ?? null)
    const [countryId, setCountryId] = useState<number | "">(customer?.countryId ?? "")
    const [city, setCity] = useState(customer?.city ?? "")
    const [postalCode, setPostalCode] = useState(customer?.postalCode ?? "")
    const [street, setStreet] = useState(customer?.street ?? "")
    const [houseNumber, setHouseNumber] = useState(customer?.houseNumber ?? "")

    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    const isEditing = customer !== null

    useEffect(() => {
        if(!show){
            return
        }

        const loadCountries = async () => {
            try {
                const data = await getCountries()
                setCountries(data)
            }catch {
                setError("Nepodarilo se nacist zeme")
            }
        }
        loadCountries()
    }, [show]);

    if(!show){
        return null
    }

    const handleSave = async () => {
        setError("")

        if(!name.trim()){
            setError("Nazev musi byt vyplnen")
            return
        }
        if(!countryId){
            setError("Vyberte zemi")
            return
        }
        if(!city.trim()){
            setError("Mesto musi byt vyplneno")
            return
        }
        if(!postalCode.trim()){
            setError("PSC musi byt vyplneno")
            return
        }
        if(!street.trim()){
            setError("Ulice musi byt vyplnena")
            return
        }
        if(!houseNumber.trim()){
            setError("Cislo popisne musi byt vyplneno")
            return
        }

        const isRegistered = Boolean(companyId?.trim());

        try {
            setSaving(true)

            if(isEditing){
                await updateCustomer(
                    customer.id,
                    {
                        name: name.trim(),
                        companyId: companyId?.trim() || null,
                        countryId: countryId,
                        city: city.trim(),
                        postalCode: postalCode.trim(),
                        street: street.trim(),
                        houseNumber: houseNumber.trim(),
                        registered: isRegistered
                    }
                )
            }else{
                await createCustomer({
                    name: name.trim(),
                    companyId: companyId?.trim() || null,
                    countryId: countryId,
                    city: city.trim(),
                    postalCode: postalCode.trim(),
                    street: street.trim(),
                    houseNumber: houseNumber.trim(),
                    registered: isRegistered
                })
            }
            onClose()
            onSaved()
        } catch {
            setError(
                isEditing
                    ? "Zakaznika se nepodarilo upravit"
                    : "Zakaznika se newpodarilo vytvorit"
            )
        }finally {
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
                        <h5 className="modal-title">
                            {isEditing
                                ? "Upravit zakaznika"
                                : "Pridat zakaznika"
                            }
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            disabled={saving}
                        />
                    </div>

                    <div className="modal-body">
                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="form-label">
                                Nazev/Jmeno zakaznika
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
                                ICO
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={companyId ?? ""}
                                onChange={(e) => setCompanyId(e.target.value)}
                                disabled={saving}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Zeme
                            </label>
                            <select
                                className="form-control"
                                value={countryId}
                                onChange={(e) => setCountryId(Number(e.target.value))}
                            >
                                <option value="">
                                    Zvolte zemi
                                </option>
                                {countries.map(country => (
                                    <option
                                        key={country.id}
                                        value={country.id}
                                    >
                                        {country.name} ({country.code})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Mesto
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                disabled={saving}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                PSC
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                disabled={saving}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Ulice
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                disabled={saving}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Cislo popisne
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={houseNumber}
                                onChange={(e) => setHouseNumber(e.target.value)}
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
                            className="btn btn-success m-lg-1"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? "Ukladam..." : "Ulozit"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}