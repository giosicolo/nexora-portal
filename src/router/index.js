import { createRouter, createWebHashHistory  } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ProposalView from '../views/ProposalView.vue'

// Bandera simple en memoria para controlar acceso
let authenticated = false

export function setAuthenticated(val) {
  authenticated = val
}

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/propuesta',
    name: 'Proposal',
    component: ProposalView,
    beforeEnter: () => {
      if (!authenticated) return '/login'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router


