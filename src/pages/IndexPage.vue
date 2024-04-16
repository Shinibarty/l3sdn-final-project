<template>
  <q-page padding class="flex flex-center justify-center" style="height: calc(100vh - 50px)">
    <div class="q-gutter-md" style="max-width: 1200px">
      <h2 class="text-center text-weight-bolder">Dashboard</h2>
      <div class="row">
        <div v-if="isManagerOrRH" class="col-xs-12 col-md-6 q-pa-md">
          <q-card class="my-card flex flex-center">
            <q-card-section> Nombre de managés : {{ userProfile.nbManaged }} </q-card-section>
          </q-card>
        </div>

        <div v-if="isManagerOrRH" class="col-xs-12 col-md-6 q-pa-md">
          <q-card class="my-card flex flex-center">
            <q-card-section> Prochain entretien : {{ userProfile.nextMeet }} </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row">
        <div v-if="!isManagerOrRH" class="col-xs-12 col-md-6 q-pa-md">
          <q-card class="my-card flex flex-center">
            <q-card-section> Mon manager : {{ managerName }} </q-card-section>
          </q-card>
        </div>

        <div class="col-xs-12 col-md-6 q-pa-md">
          <q-card class="my-card flex flex-center">
            <q-card-section>
              Mon prochain entretien personnel : {{ userProfile.persoMeet }}</q-card-section
            >
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

const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAuth()
})

const userProfile = ref(null)

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
</script>
