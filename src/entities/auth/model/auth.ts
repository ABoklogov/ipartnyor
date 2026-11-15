import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { AuthState } from '../types'

export const useAuthStore = defineStore('auth', () => {
  const state = ref<AuthState>({
    token: null,
  })

  const isAuthenticated = computed(() => state.value.token !== null)

  function setToken(token: string) {
    state.value.token = token
  }

  function clear() {
    state.value.token = null
  }

  return { state, isAuthenticated, setToken, clear }
}, {
  persist: {
    pick: ['state'],
  },
})