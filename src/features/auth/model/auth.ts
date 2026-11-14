import type { LoginFormValues, RegisterFormValues } from './schemas'

const TOKEN_KEY = 'auth_token'
const EMAIL_KEY = 'auth_email'
const NAME_KEY = 'auth_name'

// Заглушки до подключения API: сохраняем сессию локально.
export function signIn(values: LoginFormValues) {
  localStorage.setItem(TOKEN_KEY, 'demo-token')
  localStorage.setItem(EMAIL_KEY, values.email)
}

export function signUp(values: RegisterFormValues) {
  localStorage.setItem(TOKEN_KEY, 'demo-token')
  localStorage.setItem(EMAIL_KEY, values.email)
  localStorage.setItem(NAME_KEY, values.name)
}

export function signOut() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(EMAIL_KEY)
  localStorage.removeItem(NAME_KEY)
}
