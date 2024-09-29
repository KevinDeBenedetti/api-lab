import { defineStore } from 'pinia'

export const useGeoStore = defineStore('geoStore', {
    state: () => ({
        mapLocation: null as [] | null,
        codeInsee: null as number | null,
        postalCode: null as number | null,
        townName: null as string | null,
        markerInfo: null as string | null,
    }),
    actions: {
        setCodeInsee(code: number) {
            this.codeInsee = code;
        },
        setTownName(value: string) {
            this.townName = value;
        },
        setMapLocation(value: any) {
            this.mapLocation = value
        },
        async getTown(value: string) {
            const { axiosGeo } = useAxios();
            const response: any = await axiosGeo.get(`/communes?nom=${value}&fields=nom,code,codesPostaux,siren,centre,mairie,codeEpci,codeDepartement,codeRegion,population&format=json&geometry=centre`);
            console.log()
            const townCoordinates = response.data[0].mairie.coordinates.reverse();
            this.setMapLocation(townCoordinates);
        },
        async searchTown(query: string) {
            const { axiosGeo } = useAxios();
            try {
                return await axiosGeo.get(`/communes?nom=${query}&boost=population&limit=5`);
            } catch (error) {
                console.error(error)
            }
        },
        getPosition() {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                (position) => {
                const coordinates = [position.coords.latitude, position.coords.longitude];
                resolve({ coordinates });
                },
                (error) => {
                reject(error);
                })
            })
        },
        async reverseGeoCode(coordinates: any) {
            const { axiosGeo } = useAxios();
            try {
                const latitude = coordinates[0];
                const longitude = coordinates[1];

                const response: any = await axiosGeo.get(`/communes?lat=${latitude}&lon=${longitude}&fields=nom,code,codesPostaux,centre,mairie,codeEpci,codeDepartement,codeRegion,population&format=json&geometry=centre`);

                const townCoordinates = response.data[0].mairie.coordinates.reverse();

                if (!this.mapLocation) {
                    this.setMapLocation(townCoordinates);
                }

                this.setTownName(response.data[0].nom);
                this.setCodeInsee(response.data[0].code);
            } catch (error) {
                console.error(error)
            }
        }
    }
})