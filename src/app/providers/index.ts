import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import type { App } from 'vue'
import ipartnyorPreset from '@/app/theme/preset'

export function installAppProviders(app: App) {
  app.use(VueQueryPlugin)
  app.use(createPinia())
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