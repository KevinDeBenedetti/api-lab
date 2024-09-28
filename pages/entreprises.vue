<script setup lang="ts">
const entreprisesStore = useEntreprisesStore();
const entreprises = ref();
const rows = ref(10);
const totalResults = ref(0);
//  Code NAF
const selectedNaf = ref(null)
const nafOptions = ref([]);
//  Département
const selectedDepartement = ref(null)
const departementOptions = ref([])
// Code postal
const selectedPostalCode = ref(null)
// Modal avec les informations d'une entreprise
const displayDialog = ref(false);
const selectedEntreprise = ref(null);

const { data: nafResponse } = await useAsyncData("naf-all", () => 
    queryContent("/naf").find()
)

const { data: departementsResponse } = await useAsyncData("departements-all", () => 
    queryContent("/departements").find()
)

// Format NAF data to match the Select component's expectations
nafOptions.value = nafResponse.value?.[0]?.body?.map(item => ({
  code: item.id_5,
  name: item.id_5 + ' - ' + item.label_5
})) || [];

departementOptions.value = departementsResponse.value?.[0].body?.map(item => ({
    code: item.code,
    name: `${item.name} (${item.code})`
}))

// Charger les entreprises lors du montage du composant
const loadEntreprises = async (page = 1, rowsPerPage = 10, naf = '', departement = '', postalCode = '') => {
  const response = await entreprisesStore.fetchEntreprises(page, rowsPerPage, naf, departement, postalCode);
  if (response.success) {
    entreprises.value = entreprisesStore.entreprises;
    totalResults.value = entreprisesStore.totalResults;
  }
};

// Gestion du changement de page
const onPage = (event) => {
  const page = event.page + 1; // PrimeVue utilise une indexation des pages à partir de 0
  loadEntreprises(page, event.rows, selectedNaf.value?.code, selectedDepartement.value?.code, selectedPostalCode.value);
};

const onSearch = () => {
    loadEntreprises(1, rows.value, selectedNaf.value?.code, selectedDepartement.value?.code, selectedPostalCode.value);
};

const showDetails = (entreprise) => {
  selectedEntreprise.value = entreprise;
  displayDialog.value = true;
};

// Fonction pour formater la date au format dd/mm/yyyy
const formatDate = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

onMounted(() => {
    loadEntreprises();
});

</script>

<template>
    <section class="px-6 mt-28 xl:w-4/5 mx-auto">
        <h1 class="mt-16 text-4xl text-primary font-bold">Entreprises</h1>
        <div>
            <Panel class="my-6" header="Filtres de recherche" toggleable>
                <div class="flex flex-col sm:flex-row gap-6">
                    <Select v-model="selectedNaf" editable :options="nafOptions" optionLabel="name" placeholder="Code NAF" class="w-full md:w-56" />

                    <Select v-model="selectedDepartement" editable :options="departementOptions" optionLabel="name" placeholder="Département" class="w-full md:w-56" />

                    <InputNumber v-model="selectedPostalCode" placeholder="Code postal" />

                    <Button label="Rechercher" icon="pi pi-search" @click="onSearch" />
                </div>
                <ul class="mt-6">
                    <li v-if="selectedNaf">Code NAF : {{ selectedNaf.name }}</li>
                    <li v-if="selectedDepartement">Département : {{ selectedDepartement.name }}</li>
                    <li v-if="selectedPostalCode">Département : {{ selectedPostalCode }}</li>
                </ul>
            </Panel>

            <DataTable
                :value="entreprises"
                paginator
                :rows="rows"
                :totalRecords="totalResults"
                :rowsPerPageOptions="[10, 20]"
                tableStyle="min-width: 50rem"
                :lazy="true"
                @page="onPage"
            >
                <Column field="nom_complet" header="Nom complet"></Column>
                <Column field="siege" header="Siège">
                    <template #body="slotProps">
                        <span>{{ slotProps.data.siege.libelle_commune }} ({{ slotProps.data.siege.code_postal }})</span>
                    </template>
                </Column>
                <Column field="categorie_entreprise" header="Catégorie"></Column>
                <Column field="activite_principale" header="NAF"></Column>
                <Column field="siren" header="SIREN"></Column>
                <Column field="" header="Détail">
                    <template #body="slotProps">
                        <Button label="Détail" @click="showDetails(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>

            <!-- Modal avec les informations d'une entreprise -->
            <Dialog v-if="selectedEntreprise" :header="selectedEntreprise.nom_complet" v-model:visible="displayDialog" modal>
                <div>
                    <h3 class="text-lg text-gray-400 font-bold">Siège</h3>
                        <ul class="mt-2 ml-6">
                            <li><strong>Raison sociale :</strong> {{ selectedEntreprise.nom_raison_sociale }}</li>
                            <li><strong>SIREN :</strong> {{ selectedEntreprise.siren }}</li>
                            <li><strong>Adresse :</strong> {{ selectedEntreprise.siege.libelle_commune }} ({{ selectedEntreprise.siege.code_postal }})</li>
                            <li><strong>Catégorie :</strong> {{ selectedEntreprise.categorie_entreprise }}</li>
                            <li><strong>Date de création :</strong> {{ formatDate(selectedEntreprise.date_creation) }}</li>
                            <li><strong>Effectif :</strong> {{ selectedEntreprise.tranche_effectif_salarie }}</li>
                            <li><strong>Code NAF :</strong> {{ selectedEntreprise.activite_principale }}</li>
                        </ul>
                </div>

                <Divider />

                <div v-if="selectedEntreprise.matching_etablissements && selectedEntreprise.matching_etablissements.length  > 0" >
                    <h3 class="text-lg text-gray-400 font-bold">Établissements secondaires</h3>

                    <div v-for="etablissement_secondaire in selectedEntreprise.matching_etablissements">
                        <ul class="mt-2 ml-6">
                            <li><strong>SIRET :</strong> {{ etablissement_secondaire.siret }}</li>
                            <li><strong>Adresse :</strong> {{ etablissement_secondaire.adresse }}</li>
                            <li><strong>Code NAF :</strong> {{ etablissement_secondaire.activite_principale }}</li>
                            <li><strong>Date de création :</strong> {{ formatDate(etablissement_secondaire.date_creation) }}</li>
                        </ul>
                    </div>

                </div>

                <div v-else>
                    <p>Pas d'Établissements secondaires</p>
                </div>
            </Dialog>
        </div>
    </section>
</template>