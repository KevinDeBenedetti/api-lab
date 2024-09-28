<script setup lang="ts">
useSeoMeta({
  title: "Accès Libre | Établissements",
  description: "Liste des établissements."
});
</script>

<template>
  <section class="px-6 mt-28 sm:w-4/5 mx-auto">
    <Acces-libreSearch />
    <Acces-libreIntro />
    <Acces-libreList />
  </section>
</template>