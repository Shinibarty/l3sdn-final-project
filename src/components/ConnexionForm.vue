<template>
  <div class="q-pa-xl absolute-center shadow-2" style="min-width: 400px">
    <div class="q-pa-md text-h4 text-weight-bolder text-center">Connexion</div>

    <q-form class="q-gutter-md" @submit.prevent="onSubmit" @reset="onReset">
      <q-input v-model="email" filled label="Email" hint="Entrez votre mail" />

      <q-input
        v-model="password"
        filled
        type="password"
        label="Password"
        hint="Entrez votre mot de passe"
      />

      <div v-if="errorMessage" class="q-pa-md text-negative">{{ errorMessage }}</div>

      <div class="text-center">
        <q-btn label="Connexion" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import users from '../../public/users.json'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()

const onSubmit = () => {
  const user = users.find(user => user.email === email.value && user.password === password.value)
  if (user) {
    router.push('/') // Redirection en cas de succès
  } else {
    errorMessage.value = 'Le mail et/ou le mot de passe n\'est pas bon' // Définir le message d'erreur
  }
}
</script>
