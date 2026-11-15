import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { SidebarState } from '../types'

export const useSidebarStore = defineStore('sidebar', () => {
  const state = ref<SidebarState>({
    collapsed: false,
  })

  function toggle() {
    state.value.collapsed = !state.value.collapsed
  }

  function collapse() {
    state.value.collapsed = true
  }

  function expand() {
    state.value.collapsed = false
  }

  return { state, toggle, collapse, expand }
}, {
  persist: {
    pick: ['state'],
  },
})