<script setup lang="ts">
const geoStore = useGeoStore();
const accessLibreStore = useAccessLibreStore();

const erpsCount: any = ref(null);
const clientTown: any = ref(null);
const activities: any = ref(null);

watch(() => geoStore.state.townName, async (newState) => {
    clientTown.value = newState;
    await accessLibreStore.getActivitiesByTown(newState);
    activities.value = accessLibreStore.state.activities;

    await accessLibreStore.getERPSCount(geoStore.state.codeInsee);
    erpsCount.value = accessLibreStore.state.erpsCount;
});
</script>

<template>
  <!-- TODO => Ajouter une condition s'il n'y a pas d'informations Exemple avec la commune de Céret (66)-->
  <div class="p-4 mt-10">
    <Card v-if="erpsCount && clientTown">
      <template #title>Informations</template>
      <template #content>
        <!--        TODO => Afficher erpsCount avec un compteur de 0 à N-->
        <h3>Il y a {{ erpsCount }} établissements à {{ clientTown }}.</h3>
      </template>
    </Card>
  </div>

  <div class="p-4 mt-10">
    <Panel v-if="activities" header="Catégories" toggleable>
      <h3>Activités à {{ clientTown }}</h3>
      <div class="flex gap-3 flex-wrap mt-4">
        <div v-for="activity in activities" class="relative">
          <Chip class="bg-[#C2E0FAC9] border-2 border-[#2093F750] text-center text-xs" :label="activity.nom" />
          <Badge class="absolute right-[-14px] top-[-10px]" :value="activity.count" severity="contrast"></Badge>
        </div>
      </div>
    </Panel>
  </div>
</template>

<style scoped>

</style>