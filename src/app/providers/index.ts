import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import type { App } from 'vue'
import ipartnyorPreset from '@/app/theme/preset'
import { createPersistedState } from 'pinia-plugin-persistedstate'

export function installAppProviders(app: App) {
  app.use(VueQueryPlugin)

  const pinia = createPinia()
  pinia.use(createPersistedState())
  app.use(pinia)

  app.use(PrimeVue, {
    theme: {
      preset: ipartnyorPreset,
      options: {
        darkModeSelector: '.dark',
        cssLayer: false,
      },
    },
  })
}