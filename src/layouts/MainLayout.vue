<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>On t'RH</q-toolbar-title>

        <q-btn v-if="isAuthenticated" flat label="Home" class="q-ml-md on-left" @click="goToHome" />

        <q-btn v-if="isAuthenticated" flat label="Logout" class="q-ml-md" @click="logOut" />

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

console.log(isAuthenticated)

function goToLogin() {
  router.push('/login')
}

function logOut() {
  authStore.logOut()
  console.log('disconnected')
  router.push('/login')
}

function goToHome() {
  router.push('/')
}
</script>
