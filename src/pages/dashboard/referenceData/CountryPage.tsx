import {useEffect, useState} from "react";
import type {Country} from "../../../types/referenceData.ts";
import {getCountries} from "../../../api/CountryApi.ts";

export default function CountryPage(){
    const [countries, setCountries] = useState<Country[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCountries()
            setCountries(data)
        }
        fetchData()
    }, []);

    return(
        <div className="container-fluid">
            <h1>Seznam zemi</h1>

            <table className="table">
                <thead>
                <tr>
                    <th>Kod zeme</th>
                    <th>Nazev zeme</th>
                </tr>
                </thead>

                <tbody>
                {countries.map(country => (
                    <tr key={country.id}>
                        <td>{country.code}</td>
                        <td>{country.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}