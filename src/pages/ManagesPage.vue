<template>
    <div class="q-pa-md container">
      <q-table
        title="Liste de Management"
        :rows="rows"
        :columns="columns"
        row-key="name"
        class="my-styled-table"
      >
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn flat icon="account_circle" @click="onProfileClick(props.row)" />
          </q-td>

        </template>
      </q-table>
    </div>
  </template>
  
  <style scoped>
        .container {
        height: calc(100vh - 50px);
        display: flex;
        justify-content: center;
        align-items: center;
        }

        .my-styled-table {
        width: 95vw;
        max-width: 100%; 
        }
    </style>

<script setup>
import { ref, onMounted } from 'vue'
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
const columns = [
    { name: 'name', required: true, label: 'Name (Job Title)', align: 'left', field: 'name', sortable: true },
    { name: 'email', required: true, label: 'Email', align: 'left', field: 'email', sortable: true },
    { name: 'age', required: true, label: 'Age', align: 'left', field: 'age', sortable: true },
    { name: 'role', required: true, label: 'Rôle', align: 'left', field: 'role', sortable: true },
    {
    name: 'action',
    label: 'Profil',
    align: 'right',
    sortable: false,
  }
]

const rows = users.map(user => ({
    name: user.firstName + ' ' + user.lastName + ' (' + user.job + ')',
    email: user.email,
    age: user.age,
    role: user.role 
}))


</script>