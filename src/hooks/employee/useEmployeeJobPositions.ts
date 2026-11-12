import {useEffect, useState} from "react";
import type {JobPosition} from "../../types/department.ts";
import {getDepartmentDetail} from "../../api/DepartmentApi.ts";

export default function useEmployeeJobPositions(
    departmentId: number | ""
){
    const [jobPositions, setJobPositions] = useState<JobPosition[]>([]);
    const [loadingJobPositions, setLoadingJobPositions] = useState(false);
    const [jobPositionsError, setJobPositionsError] = useState("");

    useEffect(() => {
        if (departmentId === "") {
            setJobPositions([]);
            setJobPositionsError("")
            setLoadingJobPositions(false)
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

    return{
        jobPositions,
        loadingJobPositions,
        jobPositionsError
    }
}