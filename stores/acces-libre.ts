import { defineStore } from 'pinia';
import { reactive } from 'vue';

interface City {
    nom: string;
    codeDepartement: string;
}

export const useAccessLibreStore = defineStore('access-libre', {
    state: () => ({
        categories: [] as any[],
        erpsCount: null as number | null,
        erps: [] as any[],
        postalCode: null as number | null,
        townName: null as string | null,
        activities: [] as any[]
    }),
    actions: {
        setActivities(values: any[]) {
            this.activities = values;
        },
        setCategories(values: any[]) {
            this.categories = values;
        },
        setERPSCount(count: number) {
            this.erpsCount = count;
        },
        setERPS(values: any[]) {
            this.erps = values;
        },
        filterERPS(filteredCountries: City[]) {
            return filteredCountries.map(city => {
                const { nom, codeDepartement } = city;
                return `${nom} (${codeDepartement})`;
            })
        },
        async getActivitiesByTown(town: any) {
            const { axiosAccesLibre } = useAxios();
            try {
                const response: any = await axiosAccesLibre.get(`/activites/?commune=${town}`);
                const actvitiesArray: any = response.results;
                actvitiesArray.sort((a: any, b: any) => b.count - a.count);
                this.setActivities(actvitiesArray);
            } catch(error) {
                console.error(error);
                throw error;
            }
        },    
        async getERPSCount(inseeCode: any) {
            const { axiosAccesLibre } = useAxios();
            try {
                const response: any = await axiosAccesLibre.get(`/erps/?code_insee=${inseeCode}`);
                // const response: any = await $fetch(`${apiUrlAccesLibre}/erps/?code_insee=${inseeCode}`, { headers: {'Authorization': apiKey} });
                this.setERPSCount(response.count);
            } catch(error) {
                console.error(error);
                throw error;
            }
        },
        async * getERPSbyPostalCode(codeInsee: number) {
            const { axiosAccesLibre } = useAxios();
            const erps: any = [];
            try {
                const response: any = await axiosAccesLibre.get(`/erps/?code_insee=${codeInsee}`);

                // const responseERPS: any = await $fetch(`${apiUrlAccesLibre}/erps/?code_insee=${codeInsee}`, { headers: {'Authorization': apiKey} });
                // const response: any = responseERPS;

                erps.value = response.data.results;
                erps.push(...response.data.results);
                this.setERPS(response.data.results);

                let nextPage: any = response.data.next;

                if (nextPage !== null) {
                    do {
                        await new Promise(resolve => setTimeout(resolve, 500));
                        const responseByPage: any = await axiosAccesLibre.get(nextPage);
                        // const responseByPage: any = await $fetch(nextPage, { headers: {'Authorization': apiKey} });
                        const response: any = responseByPage

                        erps.push(...response.data);
                        this.setERPS(erps);
                        nextPage = response.data.next;
                        yield erps;
                    } while (nextPage !== null);
                }

            } catch (error) {
                throw error;
            }
        },
        async getERPSbyCode(codeInsee: number) {
            const { axiosAccesLibre } = useAxios();
            const erps: any = [];
            try {
                const response: any = await axiosAccesLibre.get(`/erps/?code_insee=${codeInsee}`);

                erps.value = response.data.results;
                erps.push(...response.data.results);
                this.setERPS(response.data.results);

                let nextPage: any = response.data.next;

                if (nextPage !== null) {
                    do {
                        await new Promise(resolve => setTimeout(resolve, 500));
                        const responseByPage: any = await axiosAccesLibre.get(nextPage);
                        // const responseByPage: any = await $fetch(nextPage, { headers: {'Authorization': apiKey} });
                        const response: any = responseByPage

                        erps.push(...response.data);
                        this.setERPS(erps);
                        nextPage = response.data.next;
                        erps;
                    } while (nextPage !== null);
                }

            } catch (error) {
                throw error;
            }
        },
        async getCategoriesOfERPS() {
            const categoriesCount = this.erps.reduce((count, erps) => {
                const categorySlug = erps.activite.slug;

                count[categorySlug] = (count[categorySlug] || 0) + 1;

                return count;
            }, {});

            const categoriesArray = Object.entries(categoriesCount).map(([slug, count]) => {
                const categoryName = this.erps.find(erps => erps.activite.slug === slug).activite.nom;
                return { name: categoryName, slug, count };
            })

            categoriesArray.sort((a: any, b: any) => b.count - a.count);

            this.setCategories(categoriesArray);
        }
    }
})