export interface AuthModel {
  token: string | null
}

const TOKEN_KEY = 'auth_token'

export function getAuth(): AuthModel {
  return {
    token: localStorage.getItem(TOKEN_KEY) ?? null,
  }
}

export function setAuth(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearAuth(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function isAuthenticated(): boolean {
  return getAuth().token !== null
}