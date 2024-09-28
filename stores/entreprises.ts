import { defineStore } from "pinia";

interface EntreprisesState {
    entreprises: [] | null,
    page: number;
    perPage: number;
    totalResults: number;
    totalPages: number;
}
export const useEntreprisesStore = defineStore('entreprises', {
    state: (): EntreprisesState => ({
        entreprises: null,
        page: 1,
        perPage: 5,
        totalResults: 0,
        totalPages: 0,
    }),
    actions: {
        setEntreprises(entreprises: [], totalResults: number, totalPages: number) {
            this.entreprises = entreprises;
            this.totalResults = totalResults;
            this.totalPages = totalPages;
        },
        async fetchEntreprises(page = 1, perPage = 10, naf: '', departement: '', codePostal: '') {
            const { axiosEntreprises } = useAxios();
            try {
                const nafQuery = naf ? `&activite_principale=${naf}` : '';
                const departementQuery = departement ? `&departement=${departement}` : '';
                const postalCodeQuery = codePostal ? `&code_postal=${codePostal}` : '';

                const response = await axiosEntreprises.get(
                    `/search?categorie_entreprise=PME%2CETI&minimal=false&page=${page}&per_page=${perPage}${nafQuery}${departementQuery}${postalCodeQuery}`
                );
      
                // Déstructurez les données de réponse pour mettre à jour l'état
                const { results, total_results, total_pages } = response.data;
                this.setEntreprises(results, total_results, total_pages);
        
                return { success: true, message: 'Entreprises récupérées' };
            } catch (error) {
                console.log(error);
                return { success: false, message: 'Erreur lors de la récupération des entreprises' };
            }
        }
    }
})