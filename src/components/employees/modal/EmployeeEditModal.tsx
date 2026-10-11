import type {EmployeeDetail} from "../../../types/employee.ts";
import useEmployeeEditForm from "../../../hooks/employee/useEmployeeEditForm.ts";
import BaseModal from "../../common/modal/BaseModal.tsx";
import ModalActions from "../../common/modal/ModalActions.tsx";
import FormField from "../../common/form/FormField.tsx";

type Props = {
    show: boolean;
    employee: EmployeeDetail | null;
    onClose: () => void;
    onSaved: () => void;
}

export default function EmployeeEditModal({
    show,
    employee,
    onClose,
    onSaved
}:Props){
    const {
        firstName, setFirstName, lastName, setLastName, address, setAddress, city, setCity,
        postalCode, setPostalCode, birthDate, setBirthDate, shiftId, setShiftId, jobPositionId,
        setJobPositionId, systemUsername, setSystemUsername, phone, setPhone, email, setEmail,
        saving, errors, saveError, isEditing, handleSave, shifts, loadingShifts, shiftsError,
        departments, loadingDepartments, departmentsError, jobPositions, loadingJobPositions,
        jobPositionsError, departmentId, handleDepartmentChange
    } = useEmployeeEditForm({employeeId: employee?.id ?? 0, employee: employee, onClose, onSaved})

    if(!show){
        return null
    }

    return (
        <>
            <BaseModal
                title={isEditing ? "Upravit zamestnance" : "Vytvorit zamestnance"}
                onClose={onClose}
                footer={
                    <ModalActions
                        onCancel={onClose}
                        onSubmit={handleSave}
                        cancelText="Zrusit"
                        submitText={isEditing ? "Ulozit zmeny" : "Pridat zamestnance"}
                        loadingText="Ukladam..."
                        isLoading={saving}
                    />
                }
            >
                {(saveError || shiftsError || departmentsError || jobPositionsError) && (
                    <div className="alert alert-danger">
                        {saveError || shiftsError || departmentsError || jobPositionsError}
                    </div>
                )}

                <h6 className="mb-4">Osbni udaje</h6>

                <FormField label="Jmeno">
                    <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={saving}
                    />
                    {errors.firstName && (
                        <div className="text-danger small mt-1">
                            {errors.firstName}
                        </div>
                    )}
                </FormField>
                <FormField label="Prijmeni">
                    <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={saving}
                    />
                    {errors.lastName && (
                        <div className="text-danger small mt-1">
                            {errors.lastName}
                        </div>
                    )}
                </FormField>
                <FormField label="Datum narozeni">
                    <input
                        type="date"
                        className="form-control"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        disabled={saving}
                    />
                    {errors.birthDate && (
                        <div className="text-danger small mt-1">
                            {errors.birthDate}
                        </div>
                    )}
                </FormField>

                <h6 className="mb-4">Bydliste</h6>
                <FormField label="Adresa">
                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        disabled={saving}
                    />
                    {errors.address && (
                        <div className="text-danger small mt-1">
                            {errors.address}
                        </div>
                    )}
                </FormField>
                <FormField label="Mesto">
                    <input
                        type="text"
                        className="form-control"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={saving}
                    />
                    {errors.city && (
                        <div className="text-danger small mt-1">
                            {errors.city}
                        </div>
                    )}
                </FormField>
                <FormField label="PSC">
                    <input
                        type="text"
                        className="form-control"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        disabled={saving}
                    />
                    {errors.postalCode && (
                        <div className="text-danger small mt-1">
                            {errors.postalCode}
                        </div>
                    )}
                </FormField>

                <h6 className="mb-4">Kontaktni udaje</h6>
                <FormField label="Telefon">
                    <input
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={saving}
                    />
                    {errors.phone && (
                        <div className="text-danger small mt-1">
                            {errors.phone}
                        </div>
                    )}
                </FormField>
                <FormField label="Email">
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={saving}
                    />
                    {errors.email && (
                        <div className="text-danger small mt-1">
                            {errors.email}
                        </div>
                    )}
                </FormField>

                <h6 className="mb-4">Pracovni udaje</h6>
                <FormField label="System username">
                    <input
                        type="text"
                        className="form-control"
                        value={systemUsername}
                        onChange={(e) => setSystemUsername(e.target.value)}
                        disabled={saving}
                    />
                    {errors.systemUsername && (
                        <div className="text-danger small mt-1">
                            {errors.systemUsername}
                        </div>
                    )}
                </FormField>
                <FormField label="Smena">
                    <select
                        className="form-control"
                        value={shiftId}
                        onChange={(e) =>
                            setShiftId(
                                e.target.value === "" ? "" : Number(e.target.value)
                            )
                        }
                        disabled={saving || loadingShifts}
                    >
                        <option value="">Vyberte smenu</option>

                        {shifts.map((shift) => (
                            <option key={shift.id} value={shift.id}>
                                {shift.code}
                            </option>
                        ))}
                    </select>
                    {errors.shiftId && (
                        <div className="text-danger small t-1">
                            {errors.shiftId}
                        </div>
                    )}
                </FormField>

                <FormField label="Oddeleni">
                    <select
                        className="form-control"
                        value={departmentId}
                        onChange={(e) =>
                            handleDepartmentChange(
                                e.target.value === "" ? "" : Number(e.target.value)
                            )
                        }
                        disabled={saving || loadingDepartments}
                    >
                        <option value="">Vyberte oddeleni</option>

                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Pracovni pozice">
                    <select
                        className="form-select"
                        value={jobPositionId}
                        onChange={(e) =>
                            setJobPositionId(
                                e.target.value === "" ? "" : Number(e.target.value)
                            )
                        }
                        disabled={saving || departmentId === "" || loadingJobPositions}
                    >
                        <option value="">
                            {departmentId === ""
                                ? "Nejprve vyberte oddeleni"
                                : "Vyberte pracovni pozici"
                            }
                        </option>

                        {jobPositions
                            .map((position) => (
                                <option key={position.id} value={position.id}>
                                    {position.name}
                                </option>
                            ))
                        }
                    </select>
                    {errors.jobPositionId && (
                        <div className="text-danger small mt-1">
                            {errors.jobPositionId}
                        </div>
                    )}
                </FormField>
            </BaseModal>
        </>
    )
}