<script setup lang="ts">
const accessLibreStore = useAccessLibreStore();
const geoStore = useGeoStore();

const erps: any = ref(null);
const erpsCount: any = ref(null);
const townName: any = ref(null);
const postalCode: any = ref(null);

onMounted(async () => {
  erpsCount.value = accessLibreStore.state.erpsCount;
  townName.value = geoStore.state.townName;
  // postalCode.value = mapStore.state.codeInsee;

  const codeInsee: any = geoStore.state.codeInsee;
  const erpsGenerator = accessLibreStore.getERPSbyPostalCode(codeInsee);

  erps.value = [];

  for await (const chunk of erpsGenerator) {
    erps.value = [...chunk];
  }
});
</script>

<template>
  <div class="sm:w-4/5 mx-auto">

    <div v-if="erps === null || erps.length === 0" class="flex justify-center items-center h-screen">
      <ProgressSpinner />
    </div>

    <DataView v-else :value="erps" paginator :pageLinkSize="1" :rows="10" dataKey="id" class="my-8">

      <template #list="slotProps">

        <div class="grid grid-nogutter">

          <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">

            <div class="my-4 mx-2 sm:mx-10 border-b-2 sm:flex justify-between">

              <div>

                <Chip class="bg-[#C2E0FAC9] border-2 border-[#2093F750] text-center text-xs" :label="item.activite.nom" />

                <h4 class="ml-4 text-xl mt-2">{{ item.nom }}</h4>

                <p class="ml-4 text-sm text-gray-400 font-light">{{ item.adresse }}</p>

              </div>

              <div class="flex justify-center items-center my-4 sm:w-3/5">

                <a href="#searchMap" class="mr-2">
                  <Button icon="pi pi-map-marker" label="Voir carte" severity="secondary"></Button>
                </a>

                <a v-if="item.site_internet !== '' && item.site_internet !== null" :href="item.site_internet" target="_blank">
                  <Button icon="pi pi-external-link" label="Site Web"></Button>
                </a>

                <a v-else href="#">
                  <Button icon="pi pi-question" label="Ajouter" severity="secondary"></Button>
                </a>

              </div>

            </div>

            <!--            <div class="hidden flex items-center justify-between m-4 w-auto border-b-2 pb-4">
                          <div class="w-1/5 flex justify-center">
                            <Chip class="bg-[#C2E0FAC9] border-2 border-[#2093F750] text-center" :label="item.activite.nom" />
                          </div>

                          <div class="flex flex-col w-3/5 justify-start items-start pl-10">
            &lt;!&ndash;                <Chip class="absolute top-[-36px] left-[0px]" :label="item.activite.nom" />&ndash;&gt;
                            <h4 class="text-xl mt-2">{{ item.nom }}</h4>
                            <p class="text-sm">{{ item.adresse }}</p>
                          </div>
                          <div class="flex justify-center w-1/5">
                            <a v-if="item.site_internet !== '' && item.site_internet !== null" :href="item.site_internet" target="_blank">
                              <Button icon="pi pi-external-link" label="Site Web"></Button>
                            </a>
                            <Button v-else icon="pi pi-question" label="Ajouter" severity="secondary"></Button>
                          </div>
                        </div>-->

          </div>
        </div>
      </template>
    </DataView>

  </div>
</template>