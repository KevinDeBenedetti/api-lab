<script setup lang="ts">
</script>

<template>
    <section class="relative max-w-full h-[500px] flex items-center justify-center text-center bg-cover bg-center px-6" style="background-image: url('/images/banner-api-lab-home.webp');">
        <div class="bg-black bg-opacity-70 p-8 rounded-lg max-w-lg m-auto">
            <h1 class="text-4xl text-gray-100 font-bold mb-4">API Lab</h1>
            <p class="text-lg text-white mb-6">Expérimentez, explorez et intégrez diverses APIs.</p>
            <div>
                <NuxtLink to="/entreprises">
                    <Button label="Entreprises" severity="primary" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600" />
                </NuxtLink>
            </div>
        </div>
    </section>

    <section class="max-w-2xl m-auto">
        <h2 class="mt-20 text-4xl text-red-blue">API Lab</h2>
        <p>Expérimentez, explorez et intégrez diverses APIs.</p>

        <div class="mt-10">
            <Card>
                <template #title>Gouv Entreprises</template>
                <template #content>
                    <p>Présente les entreprises enregistrées en France avec des informations détaillées telles que le code NAF, l’adresse, les effectifs, et plus.</p>

                    <p>Effectuer des recherches d'entreprises par secteur d'activité, localisation, ou autres critères économiques.</p>
                    
                    <div class="mt-6 flex gap-2">
                        <a href="https://api.gouv.fr/les-api/api-recherche-entreprises" target="_blank" rel="noopener noreferrer">
                            <Button label="API Recherche d’entreprises" severity="primary" />
                        </a>
                        <a href="https://api.gouv.fr/documentation/api-recherche-entreprises" target="_blank" rel="noopener noreferrer">
                            <Button label="Documentation" severity="primary" />
                        </a>
                    </div>

                </template>
            </Card>
        </div>
    </section>



    <section>

    </section>
</template>