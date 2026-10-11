import {useCallback, useEffect, useState} from "react";
import type {Department} from "../../types/department.ts";
import {getDepartments} from "../../api/DepartmentApi.ts";

export default function useDepartment(){
    const [departments, setDepartments] = useState<Department[]>([])

    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] = useState("")

    const fetchDepartments = useCallback(async () => {
        try{
            setLoading(true)
            setLoadError("")

            const data = await getDepartments()
            setDepartments(data)
        }catch{
            setLoadError("Nepodarilo se nacist oddeleni")
        }finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void fetchDepartments()
    }, [fetchDepartments]);

    return{
        departments,
        fetchDepartments,
        loading,
        loadError
    }
}