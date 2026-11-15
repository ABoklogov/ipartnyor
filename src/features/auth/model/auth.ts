import type { LoginFormValues, RegisterFormValues } from './schemas'
import { useAuthStore } from '@/entities/auth'
import { useProfileStore } from '@/entities/profile'

// Заглушки до подключения API: сохраняем сессию локально.
export function signIn(values: LoginFormValues) {
  useAuthStore().setToken('demo-token')
  useProfileStore().set('', values.email)
}

export function signUp(values: RegisterFormValues) {
  useAuthStore().setToken('demo-token')
  useProfileStore().set(values.name, values.email)
}

export function signOut() {
  useAuthStore().clear()
  useProfileStore().clear()
}