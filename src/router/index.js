import { createRouter, createWebHistory } from 'vue-router'
import publics from './public'
const routes = [
 ...publics
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
