<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> On t'RH </q-toolbar-title>

        <div>Mehdi Trari & Alban Stievenard</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      <ConnexionForm />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import ConnexionForm from 'src/components/ConnexionForm.vue'
</script>
