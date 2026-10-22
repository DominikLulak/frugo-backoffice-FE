import {useEffect, useState} from "react";
import type {Country} from "../types/referenceData.ts";
import {getCountries} from "../api/CountryApi.ts";

type UseCountriesOptions = {
    enabled?: boolean;
}

export default function useCountries({
    enabled = true
}:UseCountriesOptions = {} ){
    const [countries, setCountries] = useState<Country[]>([])
    const [loadingCountries, setLoadingCountries] = useState(false)
    const [countriesError, setCountriesError] = useState("")

    useEffect(() => {
        if(!enabled) return

        let cancelled = false;

        const loadCountries = async () => {
            try {
                setLoadingCountries(true)
                setCountriesError("")

                const data = await getCountries()

                if(!cancelled) setCountries(data)
            }catch{
                if(!cancelled) setCountriesError("Nepodarilo se nacist zeme")
            }finally {
                if(!cancelled) setLoadingCountries(false)
            }
        }
        void loadCountries()

        return () => {
            cancelled = true;
        }
    }, [enabled]);

    return{
        countries,
        loadingCountries,
        countriesError
    }
}