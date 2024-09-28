<script setup lang="ts">
useSeoMeta({
  title: "Accès Libre | Établissements",
  description: "Liste des établissements."
});
</script>

<template>
  <section class="px-6 mt-28 xl:w-4/5 mx-auto">
    <Acces-libreIntro />
    <Acces-libreSearch />
    <Acces-libreList />
  </section>
</template>