import { createRouter, createWebHistory } from 'vue-router'
import { requireAuth, redirectIfAuth } from './auth-guard'
import {
  ROUTE_LOGIN,
  ROUTE_REGISTER,
  ROUTE_CHAT,
  ROUTE_INVOICES,
  ROUTE_DOCUMENTS,
  ROUTE_PDF_FIXER,
  ROUTE_STORAGE,
  ROUTE_NOT_FOUND,
  PATH_LOGIN,
  PATH_REGISTER,
  PATH_INVOICES,
  PATH_DOCUMENTS,
  PATH_PDF_FIXER,
  PATH_STORAGE,
} from '@/shared/config/routes'

/**
 * Публичные маршруты (доступны без авторизации)
 */
const publicRoutes = [
  {
    path: PATH_LOGIN,
    name: ROUTE_LOGIN,
    component: () => import('@/pages/auth/login/ui/LoginPage.vue'),
    beforeEnter: [redirectIfAuth],
  },
  {
    path: PATH_REGISTER,
    name: ROUTE_REGISTER,
    component: () => import('@/pages/auth/register/ui/RegisterPage.vue'),
    beforeEnter: [redirectIfAuth],
  },
]

/**
 * Приватные маршруты (только для авторизованных)
 * Оборачиваются в PrivateLayout с сайдбаром.
 */
const privateRoutes = [
  {
    path: '/',
    component: () => import('@/widgets/private-layout/ui/PrivateLayout.vue'),
    beforeEnter: [requireAuth],
    children: [
      {
        path: '',
        name: ROUTE_CHAT,
        component: () => import('@/pages/chat/ui/ChatPage.vue'),
      },
      {
        path: PATH_INVOICES.slice(1),
        name: ROUTE_INVOICES,
        component: () => import('@/pages/invoices/ui/InvoicesPage.vue'),
      },
      {
        path: PATH_DOCUMENTS.slice(1),
        name: ROUTE_DOCUMENTS,
        component: () => import('@/pages/documents/ui/DocumentsPage.vue'),
      },
      {
        path: PATH_PDF_FIXER.slice(1),
        name: ROUTE_PDF_FIXER,
        component: () => import('@/pages/pdf-fixer/ui/PdfFixerPage.vue'),
      },
      {
        path: PATH_STORAGE.slice(1),
        name: ROUTE_STORAGE,
        component: () => import('@/pages/storage/ui/StoragePage.vue'),
      },
      {
        path: ':pathMatch(.*)*',
        name: ROUTE_NOT_FOUND,
        redirect: { name: ROUTE_CHAT },
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes, ...privateRoutes],
})

router.onError((error) => {
  console.error('[Router]', error)
})