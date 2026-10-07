import {useEffect, useState} from "react";
import type {Packaging} from "../../../types/product.ts";
import {getPackaging} from "../../../api/PackagingApi.ts";

export default function PackagingPage(){
    const [packaging, setPackaging] = useState<Packaging[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPackaging();
            setPackaging(data)
        }
        fetchData()
    }, []);

    return(
        <div className="container-fluid">
            <h1>Seznam typu baleni</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>Kod baleni</th>
                        <th>Nazev baleni</th>
                        <th>Popis baleni</th>
                    </tr>
                </thead>

                <tbody>
                {packaging.map(p => (
                    <tr key={p.id}>
                        <td>{p.code}</td>
                        <td>{p.name}</td>
                        <td>{p.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}