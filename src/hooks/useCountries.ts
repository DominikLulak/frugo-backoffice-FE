import {useEffect, useState} from "react";
import type {Country} from "../types/referenceData.ts";
import {getCountries} from "../api/CountryApi.ts";

export default function useCountries(){
    const [countries, setCountries] = useState<Country[]>([])
    const [loadingCountries, setLoadingCountries] = useState(false)
    const [countriesError, setCountriesError] = useState("")

    useEffect(() => {
        const loadCountries = async () => {
            try {
                setLoadingCountries(true)
                setCountriesError("")

                const data = await getCountries()
                setCountries(data)
            }catch{
                setCountriesError("Nepodarilo se nacist zeme")
            }finally {
                setLoadingCountries(false)
            }
        }
        void loadCountries()
    }, []);

    return{
        countries,
        loadingCountries,
        countriesError
    }
}