<script setup lang="ts">
useSeoMeta({
  title: "Accès Libre | API Lab",
  description: "Liste des établissements."
});
</script>

<template>
  <section class="px-6 mt-28 xl:w-4/5 mx-auto">
    <Acces-libreIntro />
    <Acces-libreList />
    <!--
    <Acces-libreSearch />
    -->
  </section>
</template>