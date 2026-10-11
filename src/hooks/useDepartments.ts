import {useEffect, useState} from "react";
import type {Department} from "../types/department.ts";
import {getDepartments} from "../api/DepartmentApi.ts";

export default function useDepartments(){
    const [departments, setDepartments] = useState<Department[]>([])
    const [loadingDepartments, setLoadingDepartments] = useState(false)
    const [departmentsError, setDepartmentsError] = useState("")

    useEffect(() => {
        const loadDepartments = async () => {
            try {
                setLoadingDepartments(true)
                setDepartmentsError("")

                const data = await getDepartments()
                setDepartments(data)
            }catch{
                setDepartmentsError("Nepodarilo se nacist oddeleni")
            }finally {
                setLoadingDepartments(false)
            }
        }
        void loadDepartments()
    }, []);

    return{
        departments,
        loadingDepartments,
        departmentsError
    }
}