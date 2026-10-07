import {useEffect, useState} from "react";
import type {EtiSequence} from "../../../types/etiSequence.ts";
import {getEtiSequences} from "../../../api/EtiSequenceApi.ts";

export default function EtiSequencePage(){
    const [etiSequences, setEtiSequences] = useState<EtiSequence[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEtiSequences()
            setEtiSequences(data)
        }
        fetchData()
    }, []);

    return(
        <div className="container-fluid">
            <h1>Eti sequence</h1>

    <table className="table">
        <thead>
            <tr>
                <th>Kod</th>
                <th>Popis</th>
                <th>Posledni cislo sekvence</th>
            </tr>
        </thead>

        <tbody>
        {etiSequences.map(etiSequence => (
                <tr key={etiSequence.id}>
                    <td>{etiSequence.code}</td>
                    <td>{etiSequence.description}</td>
                    <td>{etiSequence.lastNumber}</td>
                    </tr>
            ))}
        </tbody>
    </table>
    </div>
)
}