import {useCallback, useEffect, useState} from "react";
import type {Country} from "../../../types/referenceData.ts";
import {getCountries} from "../../../api/CountryApi.ts";

export default function useCountriesList(){
    const [countries, setCountries] = useState<Country[]>([])
    const [loadingCountries, setLoadingCountries] = useState(false)
    const [countriesError, setCountriesError] = useState("")

    const fetchCountries = useCallback(async () => {
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
    }, [])

    useEffect(() => {
        void fetchCountries()
    }, [fetchCountries]);

    return{
        countries,
        fetchCountries,
        loadingCountries,
        countriesError
    }
}