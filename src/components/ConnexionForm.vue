<template>
  <div class="q-pa-md absolute-center" style="min-width: 400px">
    <q-form class="q-gutter-md" @submit.prevent="onSubmit" @reset="onReset">
      <q-input
        v-model="email"
        filled
        label="Email"
        hint="Entrez votre mail"
        lazy-rules
        :rules="[
          (val) => !!val || 'Please type something',
          (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Please enter a valid email'
        ]"
      />

      <q-input
        v-model="password"
        filled
        type="password"
        label="Password"
        hint="Entrez votre mot de passe"
        lazy-rules
        :rules="[(val) => !!val || 'Please type something']"
      />

      <div>
        <q-btn label="Connexion" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const accept = ref(false)

const onSubmit = () => {
  console.log('Submitting:', { email: email.value, password: password.value, accept: accept.value })
}

const onReset = () => {
  email.value = ''
  password.value = ''
  accept.value = false
}
</script>
