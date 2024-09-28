<script lang="ts" setup>

</script>

<template>
    <div class="bg-black bg-opacity-70 p-8 rounded-lg max-w-lg m-auto">
        <h1 class="text-4xl text-gray-100 font-bold mb-4">API Lab</h1>
        <p class="text-lg text-white mb-6">Expérimentez, explorez et intégrez diverses APIs.</p>
        <div class="flex gap-2">
            <NuxtLink to="/entreprises">
                <Button label="Entreprises" severity="secondary" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600" />
            </NuxtLink>
            <NuxtLink to="/acces-libre">
                <Button label="Accès Libre" severity="secondary" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600" />
            </NuxtLink>
        </div>
    </div>
</template>