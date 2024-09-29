<script setup lang="ts">
// Variables
const erps: any = ref(null);
const rows = ref(10);
const totalResults = ref(0);
// States
// const codeInsee = computed(() => geoStore.codeInsee);
const codeInsee = ref('13047');
// Pagination
const nextPage = ref(null);
const currentPage = ref(1);

// Charger les données initiales
const loadData = async (event = null) => {
  const { axiosAccesLibre } = useAxios();
  let url = `/erps/?rows=${rows.value}&page=${currentPage.value}`;
  
  // Si c'est une page suivante, utiliser l'URL de la page suivante
  if (nextPage.value && event && event.page) {
    url = `/erps/?rows=${rows.value}&page=${event.page + 1}`;
    currentPage.value = event.page + 1;
  }

  try {
    const response = await axiosAccesLibre.get(url);
    totalResults.value = response.data.count;  // Mettre à jour le nombre total de résultats
    erps.value = response.data.results;  // Mettre à jour les données

    // Mettre à jour la prochaine page si elle existe
    nextPage.value = response.data.next;
  } catch (error) {
    console.error(error);
  }
}
onMounted(async () => {
  loadData();

  // const { axiosAccesLibre } = useAxios();
  //   try {
  //       const response = await axiosAccesLibre.get(`/erps/`);
  //       console.log(response.data.next)
  //       totalResults.value = response.data.count
  //       erps.value = response.data.results
  //   } catch(error) {
  //       console.log(error)
  //   }
    // const { axiosAccesLibre } = useAxios();
    // try {
    //     const response = await axiosAccesLibre.get(`/erps/?code_insee=${codeInsee.value}`);
    //     totalResults.value = response.data.count
    //     erps.value = response.data.results
    // } catch(error) {
    //     console.log(error)
    // }
});
</script>

<template>
    <Panel class="my-6" header="Résultats">
        <DataTable
            :value="erps"
            paginator
            :rows="rows"
            :totalRecords="totalResults"
            :rowsPerPageOptions="[10, 20]"
            tableStyle="min-width: 50rem"
            :lazy="true"
            @page="loadData"
        >
            <Column field="nom" header="Nom"></Column>
            <Column field="commune" header="Commune"></Column>
            <Column field="code_postal" header="Code Postal"></Column>
            <Column field="site_internet" header="Site Web">
                <template #body="slotProps">
                    <a :href="slotProps.data.site_internet" target="_blank" rel="noopener noreferrer">
                        <Button label="Site Web" />
                    </a>
                </template>
            </Column>
        </DataTable>
    </Panel>
</template>