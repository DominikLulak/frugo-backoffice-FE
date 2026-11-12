export type EmployeeFormErrors = {
    [key: string]: string;
}

type Props = {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    birthDate: string;
    shiftId: number | "";
    jobPositionId: number | "";
    systemUsername: string;
    phone: string;
    email: string;
}

export default function useEmployeeFormValidation({
    firstName,lastName,address,city,postalCode,birthDate,
    shiftId,jobPositionId,systemUsername,phone,email
}:Props){
    const validateForm = (): EmployeeFormErrors => {
        const errors: EmployeeFormErrors = {}

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
    return {validateForm}
}