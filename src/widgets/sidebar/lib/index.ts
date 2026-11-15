import { clearAuth } from '@/entities/auth'

export function handleLogout(): void {
  clearAuth()
}

export function isActive(
  routeName: string | symbol | null | undefined,
  name: string,
): boolean {
  return routeName === name
}