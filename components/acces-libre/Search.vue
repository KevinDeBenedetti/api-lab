<script setup lang="ts">
// Stores
const geoStore = useGeoStore();
const accessLibreStore = useAccessLibreStore();
// Variables
const value = ref("");
const mappedCities: any = ref(null);
// States
const mapLocation = computed(() => geoStore.mapLocation);
const townName = computed(() => geoStore.townName);
const codeInsee = computed(() => geoStore.codeInsee);
const erps = computed(() => accessLibreStore.erps);

const search = async (event: any) => {
    let query = event.query;
    let response: any = await geoStore.searchTown(query);
    mappedCities.value = accessLibreStore.filterERPS(response.data);
}

const show = async (value: string) => {
    const formattedValue = value.replace(/\s*\([^)]*\)\s*/, '');
    await geoStore.getTown(formattedValue);

    await geoStore.reverseGeoCode(mapLocation.value);
    console.log('Code INSEE : ', codeInsee.value);
    console.log('Town name : ', townName.value);

    await accessLibreStore.getERPSbyPostalCode(codeInsee.value)

    console.log(erps.value)
    // MAP
    // const mapElement = document.getElementById('map');
    // if (mapElement) {
    //     mapElement.scrollIntoView({ behavior: 'smooth' });
    // }
}
</script>

<template>
    <Panel class="my-6" header="Filtres de recherche" toggleable>
        <div class="flex flex-col sm:flex-row gap-6">
            <AutoComplete :pt="{ input: { class: 'w-full' } }" v-model="value" :suggestions="mappedCities" @complete="search($event)" placeholder="Saisir une commune"/>
            <Button  label="Rechercher" @click="show(value)"/>
        </div>
    </Panel>
</template>