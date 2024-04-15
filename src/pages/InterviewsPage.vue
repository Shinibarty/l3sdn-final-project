<template>
  <div class="interviews-page">
    <q-page class="q-pa-md">
      <h2 class="text-h5">Mes entretiens</h2>
      <div v-if="entretiensUtilisateur.length === 0" class="text-center q-mt-lg">
        Aucun entretien trouvé.
      </div>
      <div v-else>
        <q-card v-for="entretien in entretiensUtilisateur" :key="entretien.id" class="q-mb-md">
          <q-card-section>
            <div class="row">
              <div class="col">Date : {{ entretien.date }}</div>
              <div class="col">Statut : {{ entretien.status }}</div>
            </div>
            <div class="q-mt-sm">Notes : {{ entretien.notes }}</div>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </div>
</template>

<script setup>
import { useAuthStore } from 'src/stores/auth'
import { ref } from 'vue'
import entretiensData from '../../public/entretiens.json'

const authStore = useAuthStore()
const userId = authStore.user.id

// Filtre
const entretiensUtilisateur = entretiensData.filter(
  (entretien) => entretien.managerId === userId || entretien.employeeId === userId
)
</script>
