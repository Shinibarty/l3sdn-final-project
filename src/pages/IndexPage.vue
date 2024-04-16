<template>
  <q-page padding class="flex flex-center justify-center" style="height: calc(100vh - 50px)">
    <div class="q-gutter-md" style="max-width: 1200px">
      <h2 class="text-center text-weight-bolder">Dashboard</h2>
      <div class="row">
        <div v-if="isManagerOrRH" class="col-xs-12 col-md-6 q-pa-md">
          <q-card class="my-card flex flex-center">
            <q-card-section><b>Nombre de managés :</b> {{ userProfile.nbManaged }} </q-card-section>
          </q-card>
        </div>

        <div v-if="isManagerOrRH" class="col-xs-12 col-md-6 q-pa-md">
          <q-card class="my-card flex flex-center">
            <q-card-section>
              <b>Prochain entretien :</b> Le
              {{
                nextInterview ? `${nextInterview.date} avec ${nextInterview.employeeName}` : 'Aucun'
              }}
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row">
        <div v-if="!isManagerOrRH" class="col-xs-12 col-md-6 q-pa-md">
          <q-card class="my-card flex flex-center">
            <q-card-section><b>Mon manager :</b> {{ managerName }} </q-card-section>
          </q-card>
        </div>

        <div class="col-xs-12 col-md-6 q-pa-md">
          <q-card class="my-card flex flex-center">
            <q-card-section
              ><b>Mon prochain entretien personnel :</b> Le
              {{
                nextPersonalInterview
                  ? `${nextPersonalInterview.date} avec ${nextPersonalInterview.managerName}`
                  : 'Aucun'
              }}
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.q-page {
  display: flex;
  align-items: center;
  justify-content: center;
}
.my-card {
  height: 150px;
  min-width: 500px;
}
</style>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import users from '../../public/users.json'
import interviews from '../../public/entretiens.json'

const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAuth()
})

const userProfile = ref(null)

// Récupérer le profil de l'utilisateur connecté
if (authStore.isAuthenticated && authStore.user) {
  const user = users.find((u) => u.id === authStore.user.id)
  if (user) {
    userProfile.value = user
  }
}

// Vérifier si l'utilisateur connecté est un manager ou un RH
const isManagerOrRH = computed(() => {
  return (
    userProfile.value && (userProfile.value.role === 'manager' || userProfile.value.role === 'RH')
  )
})

// Récupérer le nom du manager d'un utilisateur
const getManagerNameById = (managerId) => {
  const manager = users.find((user) => user.id === managerId)
  if (manager) {
    return `${manager.firstName} ${manager.lastName}`
  }
  return ''
}

const managerName = computed(() => {
  if (userProfile.value) {
    const managerId = userProfile.value.managerId
    return getManagerNameById(managerId)
  }
  return ''
})

// Calculer le prochain entretien à venir où l'utilisateur connecté est le manager
const nextInterview = computed(() => {
  if (userProfile.value) {
    const userId = userProfile.value.id
    const userInterviews = interviews.filter(
      (interview) => interview.managerId === userId && interview.status === 'pending'
    )
    const nextInterview = userInterviews.reduce((prev, current) => {
      const prevDate = new Date(prev.date)
      const currentDate = new Date(current.date)
      return prevDate < currentDate ? prev : current
    }, userInterviews[0])

    if (nextInterview) {
      const employee = users.find((user) => user.id === nextInterview.employeeId)
      nextInterview.employeeName = employee ? `${employee.firstName} ${employee.lastName}` : ''
    }

    return nextInterview
  }
  return null
})

// Calculer le prochain entretien à venir où l'utilisateur connecté est l'employé
const nextPersonalInterview = computed(() => {
  if (userProfile.value) {
    const userId = userProfile.value.id
    const personalInterviews = interviews.filter(
      (interview) => interview.employeeId === userId && interview.status === 'pending'
    )
    const nextPersonalInterview = personalInterviews.reduce((prev, current) => {
      const prevDate = new Date(prev.date)
      const currentDate = new Date(current.date)
      return prevDate < currentDate ? prev : current
    }, personalInterviews[0])

    if (nextPersonalInterview) {
      const manager = users.find((user) => user.id === nextPersonalInterview.managerId)
      nextPersonalInterview.managerName = manager ? `${manager.firstName} ${manager.lastName}` : ''
    }

    return nextPersonalInterview
  }
  return null
})
</script>
