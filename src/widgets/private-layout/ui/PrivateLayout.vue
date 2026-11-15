<template>
  <div class="private-layout">
    <Sidebar />
    <main class="private-layout__content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Sidebar } from '@/widgets/sidebar'
</script>

<style scoped lang="scss">
.private-layout {
  display: flex;
  min-height: 100vh;
  background: var(--color-base-01);
  color: var(--color-text-01);

  &__content {
    flex: 1;
    min-width: 0;
    padding: 1.5rem 2rem;
    overflow-y: auto;
  }
}
</style>