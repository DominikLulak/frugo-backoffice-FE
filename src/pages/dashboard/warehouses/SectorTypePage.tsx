import {useEffect, useState} from "react";
import type {SectorType} from "../../../types/warehouse.ts";
import {getSectorTypes} from "../../../api/SectorTypeApi.ts";

export default function SectorTypePage(){
    const [sectorTypes, setSectorTypes] = useState<SectorType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSectorTypes();
            setSectorTypes(data)
        }
        fetchData()
    }, []);

    return(
        <div className="container-fluid">
            <h1>Seznam typu sektoru</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>Kod typu sektoru</th>
                        <th>Nazev typu sektoru</th>
                        <th>Popis typu sektoru</th>
                    </tr>
                </thead>

                <tbody>
                {sectorTypes.map(sectorType => (
                    <tr key={sectorType.id}>
                        <td>{sectorType.code}</td>
                        <td>{sectorType.name}</td>
                        <td>{sectorType.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}