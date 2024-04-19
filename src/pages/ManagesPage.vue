<template>
  <div class="q-pa-md container">
    <q-table
      title="Liste de Management"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      row-key="name"
      class="my-styled-table"
    >
      <template v-slot:top-right>
        <q-input  v-model="filter" borderless dense debounce="300" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
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
import { computed, ref, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { api } from '../boot/axios'

const authStore = useAuthStore()
const showDialog = ref(false)
const selectedUser = ref({})
const filter = ref('')
const users = ref([])

onMounted(async () => {
  try {
    const response = await api.get('Mehdi/Users')
    console.log(response.data)
    users.value = response.data
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs:', error)
  }
})

const filteredUsers = computed(() => {
  const userInfo = users.value.find(user => user.id === authStore.user.id)
  if (!userInfo) return []

  let result = []

  if (userInfo.role === 'manager') {
    result = users.value.filter(user => userInfo.ListeNmoins1.includes(user.idEmploye))
  } else if (userInfo.role === 'RH') {
    result = users.value.reduce((acc, user) => userInfo.ListeManager.includes(user.idManager) ? acc.concat(user) : acc, [])
  }

  if (filter.value) {
    result = result.filter(user =>
      user.firstName.toLowerCase().includes(filter.value.toLowerCase()) ||
      user.lastName.toLowerCase().includes(filter.value.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.value.toLowerCase())
    )
  }

  return result
})

function onProfileClick(row) {
  selectedUser.value = { ...row }
  showDialog.value = true
}

//fonctionne pas car on n e peut pas rajouter d'id à l'url et que lorsque je put uniquement la "selectedUser.value" ça ne fonctionne pas
//car je n'ai pas le reste du json + mes modifs
async function submitEdit() {
  try {
    await api.put('Mehdi/users', selectedUser.value)
    showDialog.value = false
  } catch (error) {
    console.error('Erreur lors de la modification du profil:', error)
  }
}

//fonctionne pas car on peut pas rajouter d'id à l'url mais pas eu le temps de voir comment supprimer uniquement la personne intéressée
async function deleteUser() {
  try {
    await api.delete('Mehdi/users/' + selectedUser.value.id)
    showDialog.value = false
  } catch (error) {
    console.error('Erreur lors de la suppression du profil:', error)
  }
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
