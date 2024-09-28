<script lang="ts" setup>
const items = ref([
    {
        label: 'Accueil',
        icon: 'pi pi-home',
        route: '/'
    },
    {
        label: 'Entreprises',
        icon: 'pi pi-star',
        route: '/entreprises'
    }   
]);
</script>

<template>
    <Menubar :model="items" class="custom-menubar">
        <template #item="{ item, props, hasSubmenu, root }">
            <div v-ripple class="flex items-center" v-bind="props.action">
                <NuxtLink :to="item.route">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                    <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                    <i v-if="hasSubmenu" :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
                </NuxtLink>
            </div>
        </template>
    </Menubar>
</template>