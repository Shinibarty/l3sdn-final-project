<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">
      <q-card>
        <q-card-section class="row items-center q-gutter-sm">
          <q-avatar icon="person" />
          <div>
            <div class="text-h6">{{ userProfile.firstName }} {{ userProfile.lastName }}</div>
            <div class="text-subtitle2">{{ userProfile.job }}</div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div><b>Email :</b> {{ userProfile.email }}</div>
          <div><b>Âge :</b> {{ userProfile.age }} ans</div>
          <div><b>Rôle :</b> {{ userProfile.role }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import users from '../../public/users.json'

const authStore = useAuthStore()

const userProfile = ref({})

onMounted(() => {
  authStore.checkAuth()
  if (authStore.isAuthenticated && authStore.user) {
    const user = users.find((u) => u.id === authStore.user.id)
    if (user) {
      userProfile.value = user
    }
  }
})
</script>

<style scoped>
.q-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
