import {useEffect, useState} from "react";
import type {Shift} from "../../../types/referenceData.ts";
import {getShifts} from "../../../api/ShiftApi.ts";

export default function ShiftPage(){
    const [shifts, setShifts] = useState<Shift[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getShifts()
            setShifts(data)
        }
        fetchData()
    }, []);

    return(
        <div className="container-fluid">
            <h1>Seznam smen</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>Kod smeny</th>
                        <th>Popis smeny</th>
                    </tr>
                </thead>

                <tbody>
                {shifts.map(shift => (
                    <tr key={shift.id}>
                        <td>{shift.code}</td>
                        <td>{shift.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}