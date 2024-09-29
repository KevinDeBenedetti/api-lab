<script setup lang="ts">
useSeoMeta({
  title: "Accueil | API Lab",
  description: "Accueil API Lab, liste des API utilisées."
});
</script>

<template>
    <header class="relative max-w-full h-[500px] flex items-center justify-center text-center bg-cover bg-center px-6" style="background-image: url('/images/banner-api-lab-home.webp');">
        <HomeIntro />
    </header>

    <section class="max-w-2xl m-auto">
        <HomeApiList />
    </section>

</template>