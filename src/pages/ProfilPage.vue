<template>
  <q-page class="my-page">
    <div class="container q-pa-md" style="min-width: 400px">
      <div class="my-profil">
        <q-card class="q-mb-md">
          <q-card-section class="row items-center q-gutter-sm">
            <q-avatar icon="person" />
            <div>
              <div class="text-h6">{{ userProfile.firstName }} {{ userProfile.lastName }}</div>
              <div class="text-subtitle2">{{ userProfile.job }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="my-information">
        <q-card class="q-pt-md q-pb-md">
          <q-card-section class="row items-center q-gutter-sm">
            <q-avatar icon="book" />
            <div class="text-h6">Information</div>
          </q-card-section>

          <q-separator />

          <q-form class="q-pa-md" @submit.prevent="submitEdit">
            <q-input v-model="userProfile.email" filled type="email" label="Email" />
            <q-input v-model="userProfile.birthDate" filled type="date" label="Date de naissance" />
            <q-input v-model="userProfile.role" filled type="option" label="Rôle" />
            <q-input
              v-model="userProfile.phoneNumber"
              filled
              type="tel"
              label="Numéro de téléphone"
            />
            <q-input v-model="userProfile.salary" filled label="Salaire" />
            <q-input v-model="userProfile.address" filled label="Adresse" />
            <div class="row justify-end q-pt-md">
              <q-btn flat label="Save" type="submit" color="positive" />
            </div>
          </q-form>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { api } from '../boot/axios'

const authStore = useAuthStore()

const userProfile = ref({})

onMounted(async () => {
  authStore.checkAuth()
  if (authStore.isAuthenticated && authStore.user) {
    try {
      const response = await api.get('/Mehdi/Users')
      const userData = response.data.find(u => u.id === authStore.user.id)
      if (userData) {
        userProfile.value = userData
        console.log('Profil de l’utilisateur connecté :', userProfile.value)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des informations de l’utilisateur:', error)
    }
  }
})

//fonctionne pas
async function submitEdit() {
  try {
    if (!userProfile.value || !userProfile.value.id) {
      console.error('Aucune information d’utilisateur à mettre à jour.')
      return
    }
    const response = await api.put('/Mehdi/Users/' + userProfile.value.id, userProfile.value)
    console.log('Profil mis à jour :', response.data)
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error)
  }
}
</script>



<style scoped>
.my-profil {
  margin-top: 75px;
  align-items: center;
}

.my-page {
  background-image: url('../assets/loginScreen.png');
  background-size: cover;
  background-position: center;
  height: 100vh;
}
</style>
