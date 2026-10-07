import {useEffect, useState} from "react";
import type {Status} from "../../../types/referenceData.ts";
import {getStatuses} from "../../../api/StatusApi.ts";

export default function StatusPage(){
    const [statuses, setStatuses] = useState<Status[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getStatuses()
            setStatuses(data)
        }
        fetchData()
    }, []);

    return(
        <div className="container-fluid">
            <h1>Seznam statusu</h1>

            <table className="table">
                <thead>
                <tr>
                    <th>Kod statusu</th>
                    <th>Nazev statusu</th>
                    <th>Popis statusu</th>
                </tr>
                </thead>

                <tbody>
                {statuses.map(status => (
                    <tr key={status.id}>
                        <td>{status.code}</td>
                        <td>{status.name}</td>
                        <td>{status.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}