import axios from 'axios';

export default function() {
    const config = useRuntimeConfig()

    const axiosEntreprises = axios.create({
        baseURL: config.public.apiEntreprises
    })

    const axiosAccesLibre = axios.create({
        baseURL: config.public.apiAccesLibre,
        headers: {
            "Authorization": config.public.apiAccesLibreKey
        }
    })

    const axiosGeo = axios.create({
        baseURL: config.public.apiGeo
    })

    return {
        axiosEntreprises,
        axiosAccesLibre,
        axiosGeo
    }
}