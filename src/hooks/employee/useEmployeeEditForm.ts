import type {EmployeeDetail} from "../../types/employee.ts";
import useShift from "../useShift.ts";
import useDepartments from "../useDepartments.ts";
import {useEffect, useState} from "react";
import {createEmployee, updateEmployee} from "../../api/EmployeeApi.ts";
import {getDepartmentDetail} from "../../api/DepartmentApi.ts";
import type {JobPosition} from "../../types/department.ts";

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
    type EmployeeFormErrors = {
        [key: string]: string;
    }

    const validateForm = () => {
        const errors: EmployeeFormErrors = {};

        const requiredFields = [
            {key: "firstName", value: firstName, label: "Jmeno"},
            {key: "lastName", value: lastName, label: "Prijmeni"},
            {key: "address", value: address, label: "Adresa"},
            {key: "city", value: city, label: "Mesto"},
            {key: "postalCode", value: postalCode, label: "PSC"},
            {key: "birthDate", value: birthDate, label: "Datum narozeni"},
            {key: "shiftId", value: shiftId, label: "Smena"},
            {key: "jobPositionId", value: jobPositionId, label: "Pracovni pozice"},
            {key: "systemUsername", value: systemUsername, label: "Systemove jmeno"},
            {key: "phone", value: phone, label: "Telefon"},
            {key: "email", value: email, label: "Email"},
        ]
        for(const field of requiredFields){
            const isEmpty =
                typeof field.value === "string"
                    ? field.value.trim() === ""
                    : false;
            if(isEmpty){
                errors[field.key] = `${field.label} musi byt vyplneno.`
            }
        }
        return errors;
    }

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

    const [saving, setSaving] = useState(false)
    const [errors, setErrors] = useState<EmployeeFormErrors>({})

    const[saveError, setSaveError] = useState("")

    const [departmentId, setDepartmentId] = useState<number | "">(
        employee?.departmentId ?? ""
    )

    const [jobPositions, setJobPositions] = useState<JobPosition[]>([]);
    const [loadingJobPositions, setLoadingJobPositions] = useState(false);
    const [jobPositionsError, setJobPositionsError] = useState("");

    useEffect(() => {
        if (departmentId === "") {
            setJobPositions([]);
            return;
        }

        let cancelled = false;

        const loadJobPositions = async () => {
            try {
                setLoadingJobPositions(true);
                setJobPositionsError("");

                const department = await getDepartmentDetail(departmentId);

                if (!cancelled) {
                    setJobPositions(department.positions);
                }
            } catch {
                if (!cancelled) {
                    setJobPositions([]);
                    setJobPositionsError("Nepodařilo se načíst pracovní pozice.");
                }
            } finally {
                if (!cancelled) {
                    setLoadingJobPositions(false);
                }
            }
        };

        void loadJobPositions();

        return () => {
            cancelled = true;
        };
    }, [departmentId]);

    const isEditing = employee !== null

    const handleDepartmentChange = (value: number | "")=> {
        setDepartmentId(value)
        setJobPositionId("")
    }

    const handleSave = async () => {
        const validationErrors = validateForm();

        setErrors(validationErrors)
        if(Object.keys(validationErrors).length > 0){
            return
        }

        if(shiftId === "" || jobPositionId === ""){
            return
        }

        try {
            setSaving(true)

            if(isEditing){
                await updateEmployee(
                    employeeId,
                    {
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        address: address.trim(),
                        city: city.trim(),
                        postalCode: postalCode.trim(),
                        birthDate: birthDate.trim(),
                        shiftId: shiftId,
                        jobPositionId: jobPositionId,
                        systemUsername: systemUsername.trim(),
                        phone: phone.trim(),
                        email: email.trim()
                    }
                )
            }else{
                await createEmployee({
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    address: address.trim(),
                    city: city.trim(),
                    postalCode: postalCode.trim(),
                    birthDate: birthDate.trim(),
                    shiftId: shiftId,
                    jobPositionId: jobPositionId,
                    systemUsername: systemUsername.trim(),
                    phone: phone.trim(),
                    email: email.trim()
                })
            }
            onClose()
            await onSaved()
        }catch{
            setSaveError(
                isEditing
                    ? "Zamestnance se nepodarilo upravit"
                    : "Zamestnance se nepodarilo vytvorit"
            )
        }finally {
            setSaving(false)
        }
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