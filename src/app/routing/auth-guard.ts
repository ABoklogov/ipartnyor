import type { NavigationGuardReturn, RouteLocationNormalized } from 'vue-router'
import { PATH_LOGIN, PATH_CHAT } from '@/shared/config/routes'
import { useAuthStore } from '@/entities/auth'

/**
 * Guard для приватных маршрутов.
 * Пока заглушка — проверяет localStorage.
 * В будущем заменить на нормальную проверку токена/сессии.
 */
export function requireAuth(
  to: RouteLocationNormalized,
): NavigationGuardReturn {
  if (!useAuthStore().isAuthenticated) {
    return { path: PATH_LOGIN, query: { redirect: to.fullPath } }
  }

  return true
}

/**
 * Guard для уже авторизованных пользователей.
 * Если пользователь уже залогинен — редиректим на главную.
 */
export function redirectIfAuth(): NavigationGuardReturn {
  if (useAuthStore().isAuthenticated) {
    return { path: PATH_CHAT }
  }

  return true
}