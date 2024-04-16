<template>
  <div class="interviews-page">
    <q-page class="q-pa-md">
      <h2 class="text-h5">Mes entretiens</h2>
      <!-- Pas d'entretiens -->
      <div
        v-if="entretiensEnAttente.length === 0 && entretiensCompletes.length === 0"
        class="text-center q-mt-lg"
      >
        Aucun entretien trouvé.
      </div>
      <div>
        <!-- Entretiens en attente -->
        <h3 v-if="entretiensEnAttente.length > 0" class="text-h6">Entretiens en attente</h3>
        <q-card
          v-for="entretien in entretiensEnAttente"
          :key="entretien.id"
          class="q-mb-md bg-blue-grey-3"
        >
          <q-card-section>
            <div class="row">
              <div class="col"><b>Date :</b> Le {{ entretien.date }}</div>
            </div>
            <div class="q-mt-sm"><b>Notes :</b> {{ entretien.notes }}</div>
          </q-card-section>
        </q-card>
        <!-- Entretiens complétés-->
        <h3 v-if="entretiensCompletes.length > 0" class="text-h6 q-mt-md">Entretiens complétés</h3>
        <q-card
          v-for="entretien in entretiensCompletes"
          :key="entretien.id"
          class="q-mb-md bg-light-green-5"
        >
          <q-card-section>
            <div class="row">
              <div class="col"><b>Date :</b> Le {{ entretien.date }}</div>
            </div>
            <div class="q-mt-sm"><b>Notes :</b> {{ entretien.notes }}</div>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </div>
</template>

<script setup>
import { useAuthStore } from 'src/stores/auth'
import { ref, computed } from 'vue'
import entretiensData from '../../public/entretiens.json'

const authStore = useAuthStore()
const userId = authStore.user.id

const entretiensUtilisateur = entretiensData.filter(
  (entretien) => entretien.managerId === userId || entretien.employeeId === userId
)

const entretiensEnAttente = ref([])
const entretiensCompletes = ref([])

// Séparer les entretiens en attente et complétés
entretiensUtilisateur.forEach((entretien) => {
  if (entretien.status === 'completed') {
    entretiensCompletes.value.push(entretien)
  } else {
    entretiensEnAttente.value.push(entretien)
  }
})
</script>
