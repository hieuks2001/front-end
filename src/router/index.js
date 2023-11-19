import { createRouter, createWebHistory } from 'vue-router'
import publics from './public'
const routes = [
 ...publics
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Get the access token from localStorage
  const accessToken = localStorage.getItem('token');
  if (requiresAuth && !accessToken) {
    // Redirect to the login page if authentication is required but no token is present
    next('/login');
  } else {
    // Continue to the next route
    next();
  }
});

export default router
