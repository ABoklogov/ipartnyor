import { useAuthStore } from '@/entities/auth'

export function handleLogout(): void {
  useAuthStore().clear()
}

export function isActive(
  routeName: string | symbol | null | undefined,
  name: string,
): boolean {
  return routeName === name
}