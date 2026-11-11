import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import type { App } from "vue";

export function installAppProviders(app: App) {
  app.use(VueQueryPlugin);
  app.use(createPinia());
}
