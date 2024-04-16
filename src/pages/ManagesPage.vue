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
  <div>
    <q-dialog v-model="showDialog">
      <q-card class="my-edit">
        <h2 class="text-center">Profil</h2>
        <q-form class="q-pa-md" @submit.prevent="submitEdit">
          <q-input v-model="selectedUser.email" filled type="email" label="Email" />
          <q-input  v-model="selectedUser.birthDate" filled type="date" label="Date de naissance" />
          <q-input  v-model="selectedUser.role" filled type="option" label="Rôle" />
          <q-input  v-model="selectedUser.phoneNumber" filled type="tel" label="Numéro de téléphone" />
          <q-input  v-model="selectedUser.salary" filled label="Salaire" />
          <q-input  v-model="selectedUser.address" filled label="Adresse" />
          <div class="row justify-end q-pt-md">
            <q-btn flat label="Delete" icon="delete" color="red" @click="deleteUser" />
            <q-btn flat label="Save" type="submit" color="positive" />
          </div>
        </q-form>
      </q-card>
    </q-dialog>
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

.my-edit {
  min-width: 500px;
}

.styled-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.styled-list li {
  margin-bottom: 0.5rem;
}
</style>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import users from '../../public/users.json'

const authStore = useAuthStore()
const showDialog = ref(false)
const selectedUser = ref({})

const filteredUsers = computed(() => {
  const userInfo = users.find(user => user.id === authStore.user.id)
  if (!userInfo) return []
  
  return userInfo.role === 'manager'
    ? users.filter(user => userInfo.ListeNmoins1.includes(user.idEmploye))
    : userInfo.role === 'RH'
    ? users.reduce((acc, user) => userInfo.ListeManager.includes(user.idManager) ? acc.concat(user) : acc, [])
    : []
})

function onProfileClick(row) {
  selectedUser.value = { ...row }
  showDialog.value = true
}

// Exemple avec fetch pour envoyer une requête de mise à jour
function submitEdit() {
//   fetch('http://localhost:3000/api/users/' + selectedUser.value.id, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(selectedUser.value)
//   })
//   .then(response => response.json())
//   .then(updatedUser => {
//     console.log('User updated:', updatedUser)
//     showDialog.value = false
//     isEditing.value = false
//   })
//   .catch(error => console.error('Failed to update user:', error))
}


function deleteUser() {
  showDialog.value = false
}

const rows = computed(() => filteredUsers.value.map(user => ({
  name: user.firstName + ' ' + user.lastName + ' (' + user.job + ')',
  email: user.email,
  age: user.age,
  role: user.role,
  phoneNumber: user.phoneNumber,
  birthDate: user.birthDate,
  salary: user.salary,
  address: user.address,
})))

const columns = [
  { name: 'name', label: 'Nom (Job Title)', align: 'left', field: 'name', sortable: true },
  { name: 'email', label: 'Email', align: 'left', field: 'email', sortable: true },
  { name: 'age', label: 'Age', align: 'left', field: 'age', sortable: true },
  { name: 'role', label: 'Rôle', align: 'left', field: 'role', sortable: true },
  { name: 'action', label: 'Profil', align: 'right', sortable: false },
]
</script>