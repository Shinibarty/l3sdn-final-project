import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null
  }),
  actions: {
    logIn(userData) {
      this.isAuthenticated = true
      this.user = userData
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userInfo', JSON.stringify(userData))
    },
    logOut() {
      this.isAuthenticated = false
      this.user = null
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userInfo')
    },
    checkAuth() {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
      this.isAuthenticated = isAuthenticated
      if (isAuthenticated) {
        const userData = JSON.parse(localStorage.getItem('userInfo'))
        this.user = userData
      }
    }
  }
})
