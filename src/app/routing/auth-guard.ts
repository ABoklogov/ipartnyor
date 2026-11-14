import type { NavigationGuardReturn, RouteLocationNormalized } from 'vue-router'

/**
 * Guard для приватных маршрутов.
 * Пока ��аглушка — проверяет localStorage.
 * В будущем заменить на нормальную проверку токена/сессии.
 */
export function requireAuth(
  to: RouteLocationNormalized,
): NavigationGuardReturn {
  const isAuthenticated = localStorage.getItem('auth_token') !== null

  if (!isAuthenticated) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  return true
}

/**
 * Guard для уже авторизованных пользователей.
 * Если пользователь уже залогинен — редиректим на главную.
 */
export function redirectIfAuth(): NavigationGuardReturn {
  const isAuthenticated = localStorage.getItem('auth_token') !== null

  if (isAuthenticated) {
    return { path: '/' }
  }

  return true
}