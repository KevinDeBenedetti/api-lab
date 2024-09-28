import axios from 'axios';

export default function() {
    const config = useRuntimeConfig()

    const axiosEntreprises = axios.create({
        baseURL: config.public.apiEntreprises
    })

    return {
        axiosEntreprises
    }
}