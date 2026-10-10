import FormInput from "../common/form/FormInput.tsx";

type Props = {
    name: string;
    companyId: string;
    countryCode: string;
    city: string;
    postalCode: string;
    registered: boolean | null;

    onNameChange: (value: string) => void;
    onCompanyIdChange: (value: string) => void;
    onCountryCodeChange: (value: string) => void;
    onCityChange: (value: string) => void;
    onPostalCodeChange: (value: string) => void;
    onRegisteredChange: (value: boolean | null) => void;

    onSubmit: () => void;
}

export default function CustomerFilters({
    name,
    companyId,
    countryCode,
    city,
    postalCode,
    registered,
    onNameChange,
    onCompanyIdChange,
    onCountryCodeChange,
    onCityChange,
    onPostalCodeChange,
    onRegisteredChange,
    onSubmit
}:Props){
    return(
        <div className="row g-2 mb-4">
            <FormInput
                value={name}
                onChange={onNameChange}
                placeholder="Nazev / Jmeno zakaznika"
            />
            <FormInput
                value={companyId}
                onChange={onCompanyIdChange}
                placeholder="ICO"
            />
            <FormInput
                value={countryCode}
                onChange={onCountryCodeChange}
                placeholder="Zeme"
            />
            <FormInput
                value={city}
                onChange={onCityChange}
                placeholder="Mesto"
            />
            <FormInput
                value={postalCode}
                onChange={onPostalCodeChange}
                placeholder="PSC"
            />

            <div className="col-md-2">
                <select
                    className="form-control"
                    value={registered === null ? "" : String(registered)}
                    onChange={(e) => {
                        const value = e.target.value

                        if(value === "") {
                            onRegisteredChange(null)
                        }else{
                            onRegisteredChange(value === "true")
                        }
                    }}
                >
                    <option value="">Vsichni</option>
                    <option value="true">Registrovani</option>
                    <option value="false">Neregistrovani</option>
                </select>
            </div>

            <div className="col-12 d-flex justify-content-end">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onSubmit}
                >
                    Filtrovat
                </button>
            </div>
        </div>
    )
}