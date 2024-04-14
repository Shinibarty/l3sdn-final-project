import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false
  }),
  actions: {
    logIn() {
      this.isAuthenticated = true
    },
    logOut() {
      this.isAuthenticated = false
    }
  }
})
