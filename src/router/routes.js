import Login from '../components/LoginForm.vue'
import MainLayout from '../layouts/MainLayout.vue'
import IndexPage from '../pages/IndexPage.vue'
import ErrorNotFound from '../pages/ErrorNotFound.vue'
import Manages from '../pages/ManagesPage.vue'
import Interviews from '../pages/InterviewsPage.vue'
import Profil from '../pages/ProfilPage.vue'
import ErrorUnauthorized from '../pages/ErrorUnauthorized.vue'

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
        path: '/manages',
        component: Manages,
        meta: { requiresAuth: true, requiredRoles: ['RH', 'manager'] }
      },
      {
        path: '/entretiens',
        component: Interviews,
        meta: { requiresAuth: true }
      },
      {
        path: '/profil',
        component: Profil,
        meta: { requiresAuth: true }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound
  },
  {
    path: '/login',
    component: Login,
    meta: { requiresAuth: false, }
  },
  {
    path: '/unauthorized',
    component: ErrorUnauthorized
  }
]

export default routes
