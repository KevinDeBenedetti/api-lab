<script setup lang="ts">
const geoStore = useGeoStore();
const accessLibreStore = useAccessLibreStore();

const townName: any = ref(null);
const erpsCount: any = ref(null);

onMounted(() => {
  townName.value = geoStore.state.townName;
  erpsCount.value = accessLibreStore.state.erpsCount;
});
</script>

<template>
  <h1 class="mt-16 text-4xl text-primary font-bold">Établissements à <span class="font-bold">{{ townName }}</span></h1>

  <p class="italic text-sm">Il y a {{ erpsCount }} établissements</p>
</template>