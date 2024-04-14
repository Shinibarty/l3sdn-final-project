<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn v-if="isAuthenticated" flat icon="home" class="q-mr-md" @click="goToHome" />
        <q-btn v-if="isAuthenticated" flat icon="logout" class="q-mr-md" @click="logOut" />

        <q-toolbar-title class="text-center flex-auto"> On t'RH </q-toolbar-title>

        <div class="text-right">Mehdi Trari & Alban Stievenard</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)

function logOut() {
  authStore.logOut()
  console.log('disconnected')
  router.push('/login')
}

function goToHome() {
  router.push('/')
}
</script>
