// src/router/index.js
import { route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import routes from './routes'
import { useAuthStore } from 'src/stores/auth'  // Importez votre store d'authentification

export default route(function ({ store, ssrContext }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory()

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const userRole = authStore.user && authStore.user.role ? authStore.user.role : null

    if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isAuthenticated) {
      next({ path: '/login' })
    } else if (to.matched.some(record => record.meta.requiredRoles && !record.meta.requiredRoles.includes(userRole))) {
      next({ path: '/unauthorized' })  
    } else {
      next()
    }
  })

  return Router
})
