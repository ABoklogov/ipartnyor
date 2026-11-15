import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ProfileState } from '../types'

export const useProfileStore = defineStore('profile', () => {
  const state = ref<ProfileState>({
    name: null,
    email: null,
  })

  const userName = computed(() => state.value.name)

  function set(name: string, email: string) {
    state.value.name = name
    state.value.email = email
  }

  function clear() {
    state.value.name = null
    state.value.email = null
  }

  return { state, userName, set, clear }
}, {
  persist: {
    pick: ['state'],
  },
})