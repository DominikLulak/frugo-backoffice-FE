import type {KeyValueRow} from "../../components/common/KeyValueTable.tsx";
import type {EmployeeDetail} from "../../types/employee.ts";

export type EmployeeDetailSection = {
    title: string;
    rows: KeyValueRow[];
}

export default function useEmployeeDetailSection(
    employee: EmployeeDetail
):EmployeeDetailSection[]{
    return [
        {
            title: "Osobni udaje",
            rows:[
                {label: "Osobni cislo", value: employee.employeeNumber},
                {label: "Jmeno", value: employee.name},
                {label: "Adresa", value: employee.address},
                {label: "Mesto", value: employee.city},
                {label: "PSC", value: employee.postalCode},
                {label: "Datum narozeni", value: employee.birthDate},
            ],
        },
        {
            title: "Pracovní údaje",
            rows: [
                { label: "Datum nástupu", value: employee.hireDate },
                { label: "Směna", value: employee.shiftCode },
                { label: "Oddělení", value: employee.departmentName },
                { label: "Pracovní pozice", value: employee.jobPositionName },
                { label: "Aktivní", value: employee.active ? "Ano" : "Ne" },
                {
                    label: "Datum ukončení smlouvy",
                    value: employee.terminationDate ?? "-",
                },
                {
                    label: "Uživatelské jméno systému",
                    value: employee.systemUsername ?? "-",
                },
            ],
        },
        {
            title: "Kontaktní údaje",
            rows: [
                { label: "Telefon", value: employee.phone ?? "-" },
                { label: "Email", value: employee.email ?? "-" },
            ],
        },
        {
            title: "Přihlašovací údaje",
            rows: [
                {
                    label: "Login username",
                    value: employee.loginUsername ?? "-",
                },
            ],
        },
    ];
}