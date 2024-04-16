<template>
  <div class="interviews-page">
    <q-page class="q-pa-md">
      <h2 class="text-h5">Mes entretiens</h2>
      
      <!-- Affichage des onglets -->
      <q-tabs v-model="selectedTab">
        <q-tab name="interviewer">Entretiens réalisés</q-tab>
        <q-tab name="interviewee">Entretiens en tant qu'interviewé</q-tab>
      </q-tabs>
      
      <!-- Contenu des onglets -->
      <q-tab-panels v-model="selectedTab">
        <!-- Entretiens en tant qu'interviewer -->
        <q-tab-panel name="interviewer">
          <!-- Entretiens en attente -->
          <div v-if="entretiensEnAttenteInterviewer.length === 0 && entretiensCompletesInterviewer.length === 0" class="text-center q-mt-lg">
            Aucun entretien trouvé.
          </div>
          <div>
            <!-- Entretiens en attente -->
            <h3 v-if="entretiensEnAttenteInterviewer.length > 0" class="text-h6">Entretiens en attente</h3>
            <q-card v-for="entretien in entretiensEnAttenteInterviewer" :key="entretien.id" class="q-mb-md bg-blue-grey-3">
              <q-card-section>
                <div class="row">
                  <div class="col"><b>Date :</b> Le {{ entretien.date }}</div>
                  <div class="col"><b>Avec :</b> {{ getSecondPersonName(entretien) }}</div>
                </div>
                <div class="q-mt-sm"><b>Notes :</b> {{ entretien.notes }}</div>
              </q-card-section>
            </q-card>
            <!-- Entretiens complétés-->
            <h3 v-if="entretiensCompletesInterviewer.length > 0" class="text-h6 q-mt-md">Entretiens complétés</h3>
            <q-card v-for="entretien in entretiensCompletesInterviewer" :key="entretien.id" class="q-mb-md bg-light-green-5">
              <q-card-section>
                <div class="row">
                  <div class="col"><b>Date :</b> Le {{ entretien.date }}</div>
                  <div class="col"><b>Avec :</b> {{ getSecondPersonName(entretien) }}</div>
                </div>
                <div class="q-mt-sm"><b>Notes :</b> {{ entretien.notes }}</div>
              </q-card-section>
            </q-card>
          </div>
        </q-tab-panel>
        
        <!-- Entretiens en tant qu'interviewé -->
        <q-tab-panel name="interviewee">
          <!-- Entretiens en attente -->
          <div v-if="entretiensEnAttenteInterviewee.length === 0 && entretiensCompletesInterviewee.length === 0" class="text-center q-mt-lg">
            Aucun entretien trouvé.
          </div>
          <div>
            <!-- Entretiens en attente -->
            <h3 v-if="entretiensEnAttenteInterviewee.length > 0" class="text-h6">Entretiens en attente</h3>
            <q-card v-for="entretien in entretiensEnAttenteInterviewee" :key="entretien.id" class="q-mb-md bg-blue-grey-3">
              <q-card-section>
                <div class="row">
                  <div class="col"><b>Date :</b> Le {{ entretien.date }}</div>
                  <div class="col"><b>Avec :</b> {{ getSecondPersonName(entretien) }}</div>
                </div>
                <div class="q-mt-sm"><b>Notes :</b> {{ entretien.notes }}</div>
              </q-card-section>
            </q-card>
            <!-- Entretiens complétés-->
            <h3 v-if="entretiensCompletesInterviewee.length > 0" class="text-h6 q-mt-md">Entretiens complétés</h3>
            <q-card v-for="entretien in entretiensCompletesInterviewee" :key="entretien.id" class="q-mb-md bg-light-green-5">
              <q-card-section>
                <div class="row">
                  <div class="col"><b>Date :</b> Le {{ entretien.date }}</div>
                  <div class="col"><b>Avec :</b> {{ getSecondPersonName(entretien) }}</div>
                </div>
                <div class="q-mt-sm"><b>Notes :</b> {{ entretien.notes }}</div>
              </q-card-section>
            </q-card>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-page>
  </div>
</template>

<script setup>
import { useAuthStore } from 'src/stores/auth'
import { ref, computed } from 'vue'
import entretiensData from '../../public/entretiens.json'
import users from '../../public/users.json'

const authStore = useAuthStore()
const userId = authStore.user.id

const entretiensUtilisateur = entretiensData.filter(
  (entretien) => entretien.managerId === userId || entretien.employeeId === userId
)

// Séparer les entretiens où l'utilisateur est interviewer ou interviewé
const entretiensEnAttenteInterviewer = ref([])
const entretiensCompletesInterviewer = ref([])
const entretiensEnAttenteInterviewee = ref([])
const entretiensCompletesInterviewee = ref([])

entretiensUtilisateur.forEach((entretien) => {
  if (entretien.status === 'completed') {
    if (entretien.managerId === userId) {
      entretiensCompletesInterviewer.value.push(entretien)
    } else {
      entretiensCompletesInterviewee.value.push(entretien)
    }
  } else {
    if (entretien.managerId === userId) {
      entretiensEnAttenteInterviewer.value.push(entretien)
    } else {
      entretiensEnAttenteInterviewee.value.push(entretien)
    }
  }
})

// Afficher le nom de l'autre personne présente à l'entretien
const getSecondPersonName = (entretien) => {
  const secondPersonId = entretien.managerId === userId ? entretien.employeeId : entretien.managerId
  const secondPerson = users.find((user) => user.id === secondPersonId)
  return secondPerson ? `${secondPerson.firstName} ${secondPerson.lastName}` : 'Inconnu'
}

// Gérer les onglets
const selectedTab = ref('interviewer')
</script>
