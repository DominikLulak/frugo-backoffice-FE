import type {EmployeeDetail} from "../../../types/employee.ts";
import useShift from "../../useShift.ts";
import useDepartments from "../../useDepartments.ts";
import {useState} from "react";
import useEmployeeFormValidation, {type EmployeeFormErrors} from "./useEmployeeFormValidation.ts";
import useEmployeeJobPositions from "../useEmployeeJobPositions.ts";
import useEmployeeFormSubmit from "./useEmployeeFormSubmit.ts";

type Props = {
    employeeId: number;
    employee: EmployeeDetail | null;
    onClose: () => void;
    onSaved: () => void | Promise<void>;
}

export default function useEmployeeEditForm({
    employeeId,
    employee,
    onClose,
    onSaved
}:Props){
    const {shifts, loadingShifts, shiftsError} = useShift()
    const {departments, loadingDepartments, departmentsError} = useDepartments()

    const [firstName, setFirstName] = useState(employee?.firstName ?? "")
    const [lastName, setLastName] = useState(employee?.lastName ?? "")
    const [address, setAddress] = useState(employee?.address ?? "")
    const [city, setCity] = useState(employee?.city ?? "")
    const [postalCode, setPostalCode] = useState(employee?.postalCode ?? "")
    const [birthDate, setBirthDate] = useState(employee?.birthDate ?? "")
    const [shiftId, setShiftId] = useState<number | "">(employee?.shiftId ?? "")
    const [jobPositionId, setJobPositionId] = useState<number | "">(employee?.jobPositionId ?? "")
    const [systemUsername, setSystemUsername] = useState(employee?.systemUsername ?? "")
    const [phone, setPhone] = useState(employee?.phone ?? "")
    const [email, setEmail] = useState(employee?.email ?? "")

    const [errors, setErrors] = useState<EmployeeFormErrors>({})

    const [departmentId, setDepartmentId] = useState<number | "">(
        employee?.departmentId ?? ""
    )

    const {validateForm} = useEmployeeFormValidation({
        firstName,lastName,address,city,postalCode,birthDate,
        shiftId,jobPositionId,systemUsername,phone,email
    })

    const {jobPositions, loadingJobPositions, jobPositionsError} = useEmployeeJobPositions(departmentId)

    const isEditing = employee !== null

    const {saving, saveError, handleSubmit} = useEmployeeFormSubmit({employeeId, isEditing, onClose, onSaved})

    const handleDepartmentChange = (value: number | "")=> {
        setDepartmentId(value)
        setJobPositionId("")
    }

    const handleSave = async () => {
        const validationErrors = validateForm()

        setErrors(validationErrors)

        if(Object.keys(validationErrors).length > 0){return}

        if(shiftId === "" || jobPositionId === "") {return}

        await handleSubmit({
            firstName, lastName, address, city, postalCode, birthDate, shiftId,
            jobPositionId, systemUsername, phone, email
        })
    }

    return{
        firstName,
        setFirstName,
        lastName,
        setLastName,
        address,
        setAddress,
        city,
        setCity,
        postalCode,
        setPostalCode,
        birthDate,
        setBirthDate,
        shiftId,
        setShiftId,
        jobPositionId,
        setJobPositionId,
        systemUsername,
        setSystemUsername,
        phone,
        setPhone,
        email,
        setEmail,
        saving,
        errors,
        saveError,
        isEditing,
        handleSave,
        shifts,
        loadingShifts,
        shiftsError,
        departments,
        loadingDepartments,
        departmentsError,
        jobPositions,
        loadingJobPositions,
        jobPositionsError,
        departmentId,
        handleDepartmentChange
    }
}