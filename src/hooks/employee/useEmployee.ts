import {useCallback, useEffect, useState} from "react";
import type {Employee} from "../../types/employee.ts";
import {getEmployees} from "../../api/EmployeeApi.ts";

export type EmployeeFiltersState = {
    employeeNumber: string;
    name: string;
    shiftCode: string;
    departmentName: string;
    jobPositionCode: string;
    active: boolean | null;
}

const initialFilters: EmployeeFiltersState = {
    employeeNumber: "",
    name: "",
    shiftCode: "",
    departmentName: "",
    jobPositionCode: "",
    active: null
}

export default function useEmployee(){
    const [employees, setEmployees] = useState<Employee[]>([])
    const [filters, setFilters] = useState<EmployeeFiltersState>(initialFilters)

    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] = useState("")

    const updateFilters = <K extends keyof EmployeeFiltersState>(
        key: K,
        value: EmployeeFiltersState[K]
    ) => {
        setFilters(previous => ({
            ...previous,
            [key]: value
        }))
    }

    const fetchEmployees = useCallback(async (
        applyFilters = false,
        filterValues?: EmployeeFiltersState
    ) => {
        try {
            setLoading(true)
            setLoadError("")

            const data = applyFilters
                ? await getEmployees(
                    filterValues?.employeeNumber ?? "",
                    filterValues?.name ?? "",
                    filterValues?.shiftCode ?? "",
                    filterValues?.departmentName ?? "",
                    filterValues?.jobPositionCode ?? "",
                    filterValues?.active ?? null
                )
                : await getEmployees()

            setEmployees(data)
        }catch{
            setLoadError("Nepodarilo se nacist zamestnance")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchEmployees()
    }, [fetchEmployees]);

    return{
        employees,
        filters,
        updateFilters,
        fetchEmployees,
        loading,
        loadError
    }
}