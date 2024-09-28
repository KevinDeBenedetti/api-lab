<script lang="ts" setup>

</script>

<template>
    <p class="mt-10">Expérimentez, explorez et intégrez diverses APIs.</p>
    
    <Card class="mt-10">
        <template #title>Gouv Entreprises</template>
        <template #content>
            <Fieldset legend="recherche-entreprises.api.gouv.fr">
                <p>Présente les entreprises enregistrées en France avec des informations détaillées telles que le code NAF, l’adresse, les effectifs, et plus.</p>

                <p>Effectuer des recherches d'entreprises par secteur d'activité, localisation, ou autres critères économiques.</p>

                <div class="mt-6 flex gap-2">
                    <a href="https://api.gouv.fr/les-api/api-recherche-entreprises" target="_blank" rel="noopener noreferrer">
                        <Button label="API" severity="primary" />
                    </a>
                    <a href="https://api.gouv.fr/documentation/api-recherche-entreprises" target="_blank" rel="noopener noreferrer">
                        <Button label="Documentation" severity="primary" />
                    </a>
                </div>
            </Fieldset>
        </template>
    </Card>

    <Card class="mt-10">
        <template #title>Accès Libre</template>
        <template #content>
            <Fieldset legend="acceslibre.beta.gouv.fr">
                <p>Découvrez une carte interactive mettant en évidence les emplacements des établissements PMR dans différentes communes. La carte est alimentée par des données en temps réel provenant de l'API Accès Libre, permettant aux utilisateurs de visualiser facilement la répartition des établissements accessibles.</p>

                <div class="mt-6 flex gap-2">
                    <a href="https://acceslibre.beta.gouv.fr/api/" target="_blank" rel="noopener noreferrer">
                        <Button label="API" severity="primary" />
                    </a>
                    <a href="https://api.gouv.fr/documentation/api-acces-libre" target="_blank" rel="noopener noreferrer">
                        <Button label="Documentation" severity="primary" />
                    </a>
                </div>
            </Fieldset>
        </template>
    </Card>

    <Card class="mt-10">
        <template #title>Géo - Découpage Administratif</template>
        <template #content>
            <Fieldset legend="geo.api.gouv.fr">
                <div class="mt-6 flex gap-2">
                    <a href="https://api.gouv.fr/les-api/api-geo" target="_blank" rel="noopener noreferrer">
                        <Button label="API" severity="primary" />
                    </a>
                    <a href="https://api.gouv.fr/documentation/api-geo" target="_blank" rel="noopener noreferrer">
                        <Button label="Documentation" severity="primary" />
                    </a>
                    <a href="https://geo.api.gouv.fr/decoupage-administratif" target="_blank" rel="noopener noreferrer">
                        <Button label="Découpage Administratif" severity="primary" />
                    </a>
                </div>
            </Fieldset>
        </template>
    </Card>

</template>