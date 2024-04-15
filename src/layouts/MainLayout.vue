<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div class="q-pa-md">
          <div class="q-gutter-md">
            <q-btn v-if="isAuthenticated" flat icon="menu">

              <q-menu fit>
                <q-list style="min-width: 100px">
                  <q-item clickable @click="goToManages">
                    <q-item-section>Management</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable @click="goToInterviews">
                    <q-item-section>Mes entretiens</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>        

        <q-btn v-if="isAuthenticated" flat icon="home" class="q-mr-md" @click="goToHome" />
        
        <q-btn v-if="isAuthenticated" flat icon="logout" class="q-mr-md absolute-right" @click="logOut" />

        <q-toolbar-title class="text-center flex-auto"> On t'RH </q-toolbar-title>
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

function goToManages() {
  router.push('/manages')
}

function goToInterviews() {
  router.push('/interviews')
}

</script>
