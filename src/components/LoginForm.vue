<template>
  <div class="login-background">
    <div class="login-form q-pa-xl absolute-center shadow-2">
      <div class="q-pa-md text-h4 text-weight-bolder text-center">Connexion</div>

      <q-form class="q-gutter-md" @submit.prevent="onSubmit">
        <q-input v-model="email" filled label="Email" hint="Entrez votre mail" />

        <q-input
          v-model="password"
          filled
          type="password"
          label="Password"
          hint="Entrez votre mot de passe"
        />

        <div v-if="errorMessage" class="q-pa-md text-negative">{{ errorMessage }}</div>

        <div class="text-center q-pa-md">
          <q-btn label="Connexion" type="submit" color="primary" style="width: 100%" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<style scoped>
.login-background {
  background-image: url('../assets/loginScreen.png');
  background-size: cover;
  background-position: center;
  height: 100vh;
}

.login-form {
  min-width: 400px;
  background-color: rgb(159, 79, 79);
  border-radius: 10% / 50%;
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import users from '../../public/users.json'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()
const authStore = useAuthStore()

const onSubmit = () => {
  const user = users.find((user) => user.email === email.value && user.password === password.value)

  if (user) {
    authStore.logIn(user)
    console.log('connected')
    router.push('/')
  } else {
    errorMessage.value = 'Erreur : Le mail et/ou le mot de passe est incorrect'
  }
}
</script>
