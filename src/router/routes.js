import Login from '../components/LoginForm.vue'
import MainLayout from '../layouts/MainLayout.vue'
import IndexPage from '../pages/IndexPage.vue'
import ErrorNotFound from '../pages/ErrorNotFound.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: false },
    children: [
      {
        path: '',
        component: IndexPage,
        meta: { requiresAuth: true }
      },
      {
        path: '/login',
        component: Login,
        meta: { requiresAuth: false }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound
  }
]

export default routes
