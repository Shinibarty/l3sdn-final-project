import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false
  }),
  actions: {
    checkAuth() {
      this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    },
    logIn() {
      this.isAuthenticated = true
      localStorage.setItem('isAuthenticated', 'true')
    },
    logOut() {
      this.isAuthenticated = false
      localStorage.removeItem('isAuthenticated')
    }
  }
})
