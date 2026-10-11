import FormInput from "../common/form/FormInput.tsx";

type Props = {
    employeeNumber: string;
    name: string;
    shiftCode: string;
    departmentName: string;
    jobPositionCode: string;
    active: boolean | null;

    onEmployeeNumberChange: (value: string) => void;
    onNameChange: (value: string) => void;
    onShiftCodeChange: (value: string) => void;
    onDepartmentNameChange: (value: string) => void;
    onJobPositionCodeChange: (value: string) => void;
    onActiveChange: (value: boolean | null) => void;

    onSubmit: () => void;
}

export default function EmployeeFilters({
    employeeNumber,
    name,
    shiftCode,
    departmentName,
    jobPositionCode,
    active,
    onEmployeeNumberChange,
    onNameChange,
    onShiftCodeChange,
    onDepartmentNameChange,
    onJobPositionCodeChange,
    onActiveChange,
    onSubmit
}:Props){
    return(
        <div className="row g-2 mb-4">
            <FormInput
                value={employeeNumber}
                onChange={onEmployeeNumberChange}
                placeholder="Cislo zamestnance"
            />
            <FormInput
                value={name}
                onChange={onNameChange}
                placeholder="Jmeno"
            />
            <FormInput
                value={shiftCode}
                onChange={onShiftCodeChange}
                placeholder="Kod smeny"
            />
            <FormInput
                value={departmentName}
                onChange={onDepartmentNameChange}
                placeholder="Nazev oddeleni"
            />
            <FormInput
                value={jobPositionCode}
                onChange={onJobPositionCodeChange}
                placeholder="Kod pracovni pozice"
            />

            <div className="col-md-2">
                <select
                    className="form-control"
                    value={active === null ? "" : String(active)}
                    onChange={(e) => {
                        const value = e.target.value

                        if(value === ""){
                            onActiveChange(null)
                        }else{
                            onActiveChange(value === "true")
                        }
                    }}
                >
                    <option value="">Vse</option>
                    <option value="true">Aktivni</option>
                    <option value="false">Neaktivni</option>
                </select>
            </div>

            <div className="col-12 d-flec justify-content-end">
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