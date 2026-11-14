import { createRouter, createWebHistory } from 'vue-router'
import { requireAuth, redirectIfAuth } from './auth-guard'

/**
 * Публичные маршруты (доступны без авторизации)
 */
const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth/login/ui/LoginPage.vue'),
    beforeEnter: [redirectIfAuth],
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/auth/register/ui/RegisterPage.vue'),
    beforeEnter: [redirectIfAuth],
  },
]

/**
 * Приватные маршруты (только для авторизованных)
 */
const privateRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home/ui/HomePage.vue'),
    beforeEnter: [requireAuth],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/',
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes, ...privateRoutes],
})

router.onError((error) => {
  console.error('[Router]', error)
})