import type {EmployeeFiltersState} from "./useEmployeeList.ts";
import type {FilterField} from "../../../components/common/filters/Filters.tsx";

type Props = {
    filters: EmployeeFiltersState;
    updateFilters: <K extends keyof EmployeeFiltersState>(
        key: K,
        value: EmployeeFiltersState[K],
    ) => void;
};

export default function useEmployeeFilters({
    filters,
    updateFilters
}:Props):FilterField[]{
    return [
        {
            name: "employeeNumber",
            type: "text",
            value: filters.employeeNumber,
            placeholder: "Cislo zamestnance",
            onChange: (value) => updateFilters("employeeNumber", value),
        },
        {
            name: "name",
            type: "text",
            value: filters.name,
            placeholder: "Jmeno",
            onChange: (value) => updateFilters("name", value),
        },
        {
            name: "shiftCode",
            type: "text",
            value: filters.shiftCode,
            placeholder: "Kod smeny",
            onChange: (value) => updateFilters("shiftCode", value),
        },
        {
            name: "departmentName",
            type: "text",
            value: filters.departmentName,
            placeholder: "Nazev oddeleni",
            onChange: (value) => updateFilters("departmentName", value),
        },
        {
            name: "jobPositionCode",
            type: "text",
            value: filters.jobPositionCode,
            placeholder: "Kod pracovni pozice",
            onChange: (value) => updateFilters("jobPositionCode", value),
        },
        {
            name: "active",
            type: "select",
            value: filters.active === null ? "" : String(filters.active),
            placeholder: "Vsichni",
            options: [
                {label: "Aktivni", value: "true"},
                {label: "Neaktivni", value: "false"},
            ],
            onChange: (value) =>
                updateFilters(
                    "active",
                    value === "" ? null : value === "true",
                ),
        },
    ]
}