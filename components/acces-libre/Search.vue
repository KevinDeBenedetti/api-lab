<script setup lang="ts">
const geoStore = useGeoStore();
const accessLibreStore = useAccessLibreStore();

const value = ref("");
const mappedCities: any = ref(null);

const search = async (event: any) => {
  let query = event.query;
  let response: any = await geoStore.searchTown(query);
  mappedCities.value = accessLibreStore.filterERPS(response.data);
}

const show = async (value: string) => {
  const formattedValue = value.replace(/\s*\([^)]*\)\s*/, '');

  await geoStore.getTown(formattedValue);

  const mapElement = document.getElementById('map');
  if (mapElement) {
    mapElement.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<template>
  <Panel class="my-6" header="Filtres de recherche" toggleable>
    <div class="flex flex-col sm:flex-row gap-6">
      <AutoComplete :pt="{ input: { class: 'w-full' } }" v-model="value" :suggestions="mappedCities" @complete="search($event)" placeholder="Saisir une commune"/>
      <Button  label="Rechercher" @click="show(value)"/>
    </div>

  </Panel>

  <!--
    <div>
    <Card class="mt-10 lg:mt-0">
      <template #title>Recherche</template>
      <template #content>
        <div class="flex flex-col gap-4 md:justify-center md:w-3/5 md:mx-auto lg:w-full">
          <AutoComplete :pt="{ input: { class: 'w-full' } }" v-model="value" :suggestions="mappedCities" @complete="search($event)" placeholder="Saisir une commune"/>
          <Button  label="Rechercher" @click="show(value)"/>
        </div>
      </template>
    </Card>
  </div>
  -->

</template>