<template>
  <div class="private-layout">
    <Sidebar />
    <div class="private-layout__main">
      <AppHeader>
        <template #start>
          <span class="private-layout__page-title">{{ pageTitle }}</span>
        </template>
        <template #end>
          <span class="private-layout__user-name">{{ userName }}</span>
        </template>
      </AppHeader>
      <main class="private-layout__content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Sidebar } from '@/widgets/sidebar'
import { AppHeader } from '@/widgets/app-header'
import { useProfileStore } from '@/entities/profile'
import {
  PAGE_CHAT,
  PAGE_INVOICES,
  PAGE_DOCUMENTS,
  PAGE_PDF_FIXER,
  PAGE_STORAGE,
  ROUTE_CHAT,
  ROUTE_INVOICES,
  ROUTE_DOCUMENTS,
  ROUTE_PDF_FIXER,
  ROUTE_STORAGE,
} from '@/shared/config/routes'

const route = useRoute()

const pageTitles: Record<string, string> = {
  [ROUTE_CHAT]: PAGE_CHAT,
  [ROUTE_INVOICES]: PAGE_INVOICES,
  [ROUTE_DOCUMENTS]: PAGE_DOCUMENTS,
  [ROUTE_PDF_FIXER]: PAGE_PDF_FIXER,
  [ROUTE_STORAGE]: PAGE_STORAGE,
}

const pageTitle = computed(() => {
  const name = route.name as string | null
  return name ? pageTitles[name] ?? '' : ''
})

const userName = computed(() => useProfileStore().userName || '')
</script>

<style scoped lang="scss">
.private-layout {
  display: flex;
  min-height: 100vh;
  background: var(--color-base-01);
  color: var(--color-text-01);

  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  &__content {
    flex: 1;
    padding: 1.5rem 2rem;
    overflow-y: auto;
  }

  &__page-title {
    font-size: 1.1rem;
    font-weight: 600;
  }

  &__user-name {
    font-size: 0.9rem;
    color: var(--color-text-02);
  }
}
</style>