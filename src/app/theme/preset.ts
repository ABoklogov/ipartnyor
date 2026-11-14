import { definePreset } from '@primevue/themes'
import aura from '@primevue/themes/aura'

// --- Цветовая палитра приложения ---
// Основной цвет $color-primary = #597719 (хаки)
const HAKI_GREEN = {
  50: '#f2f7e6',
  100: '#e0edc2',
  200: '#cce29b',
  300: '#b2d16e',
  400: '#95bd45',
  500: '#597719',
  600: '#4a6314',
  700: '#3c5010',
  800: '#2e3e0c',
  900: '#202c08',
  950: '#121a04',
}

// --- Surface (цвета фона) из задачи ---
const APP_SURFACE = {
  0: '#ffffff',
  50: '#2a2930',
  100: '#25242a',
  200: '#100f14',
  300: '#2f3038',
  400: '#24243a',
  500: '#161621',
  600: '#12121c',
  700: '#0e0e16',
  800: '#0a0a10',
  900: '#06060a',
  950: '#030305',
}

/**
 * Кастомный preset на основе Aura с палитрой приложения ipartnyor.
 */
const ipartnyorPreset = definePreset(aura, {
  semantic: {
    // Primary — зелёно-хаки
    primary: {
      50: HAKI_GREEN[50],
      100: HAKI_GREEN[100],
      200: HAKI_GREEN[200],
      300: HAKI_GREEN[300],
      400: HAKI_GREEN[400],
      500: HAKI_GREEN[500],
      600: HAKI_GREEN[600],
      700: HAKI_GREEN[700],
      800: HAKI_GREEN[800],
      900: HAKI_GREEN[900],
      950: HAKI_GREEN[950],
    },
    // Surface — тёмная тема
    surface: {
      0: APP_SURFACE[0],
      50: APP_SURFACE[50],
      100: APP_SURFACE[100],
      200: APP_SURFACE[200],
      300: APP_SURFACE[300],
      400: APP_SURFACE[400],
      500: APP_SURFACE[500],
      600: APP_SURFACE[600],
      700: APP_SURFACE[700],
      800: APP_SURFACE[800],
      900: APP_SURFACE[900],
      950: APP_SURFACE[950],
    },
  },
})

export default ipartnyorPreset