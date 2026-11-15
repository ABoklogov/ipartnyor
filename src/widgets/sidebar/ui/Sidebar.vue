<template>
  <aside
    class="sidebar"
    :class="{ 'sidebar--collapsed': isCollapsed }"
  >
    <div class="sidebar__header">
      <span
        v-show="!isCollapsed"
        class="sidebar__brand"
      >ipartnyor</span>
      <Button
        class="sidebar__toggle"
        :icon="isCollapsed ? 'pi pi-angle-right' : 'pi pi-angle-left'"
        severity="secondary"
        outlined
        aria-label="Свернуть / развернуть сайдбар"
        @click="isCollapsed = !isCollapsed"
      />
    </div>

    <nav class="sidebar__nav">
      <router-link
        v-for="item in navItems"
        :key="item.name"
        :to="{ name: item.name }"
        class="sidebar__nav-item"
        :class="{ 'sidebar__nav-item--active': active(item.name) }"
      >
        <span class="sidebar__nav-indicator" />
        <i :class="['sidebar__nav-icon', `pi ${item.icon}`]" />
        <span
          v-show="!isCollapsed"
          class="sidebar__nav-label"
        >{{ item.label }}</span>
      </router-link>
    </nav>

    <div class="sidebar__footer">
      <a
        class="sidebar__nav-item sidebar__nav-item--logout"
        href="#"
        @click.prevent="onLogout"
      >
        <span class="sidebar__nav-indicator" />
        <i class="sidebar__nav-icon pi pi-sign-out" />
        <span
          v-show="!isCollapsed"
          class="sidebar__nav-label"
        >Выйти</span>
      </a>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Button from 'primevue/button'
import {
  ROUTE_LOGIN,
  ROUTE_CHAT,
  ROUTE_INVOICES,
  ROUTE_DOCUMENTS,
  ROUTE_PDF_FIXER,
  ROUTE_STORAGE,
  PAGE_CHAT,
  PAGE_INVOICES,
  PAGE_DOCUMENTS,
  PAGE_PDF_FIXER,
  PAGE_STORAGE,
  ICON_CHAT,
  ICON_INVOICES,
  ICON_DOCUMENTS,
  ICON_PDF_FIXER,
  ICON_STORAGE,
} from '@/shared/config/routes'
import type { NavItem } from '../types'
import { isActive, handleLogout } from '../lib'

const navItems: NavItem[] = [
  { name: ROUTE_CHAT, label: PAGE_CHAT, icon: ICON_CHAT },
  { name: ROUTE_INVOICES, label: PAGE_INVOICES, icon: ICON_INVOICES },
  { name: ROUTE_DOCUMENTS, label: PAGE_DOCUMENTS, icon: ICON_DOCUMENTS },
  { name: ROUTE_PDF_FIXER, label: PAGE_PDF_FIXER, icon: ICON_PDF_FIXER },
  { name: ROUTE_STORAGE, label: PAGE_STORAGE, icon: ICON_STORAGE },
]

const router = useRouter()
const route = useRoute()
const isCollapsed = ref(false)

function active(name: string): boolean {
  return isActive(route.name, name)
}

function onLogout() {
  handleLogout()
  router.push({ name: ROUTE_LOGIN })
}
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  width: 15rem;
  min-width: 15rem;
  background: var(--color-base-02);
  border-right: 1px solid var(--color-base-03);
  transition: width 0.25s ease, min-width 0.25s ease;
  overflow: hidden;

  &--collapsed {
    width: 3.75rem;
    min-width: 3.75rem;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3.5rem;
    padding: 0 0.75rem;
    border-bottom: 1px solid var(--color-base-03);
  }

  &__brand {
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__toggle {
    width: 2rem;
    height: 2rem;
    border-radius: 0.375rem;
    flex-shrink: 0;

    :deep(.p-button-icon) {
      font-size: 1.15rem;
    }
  }

  &__nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    padding: 0.75rem 0;
  }

  &__nav-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    height: 2.75rem;
    padding: 0 1rem;
    color: var(--color-text-02);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s, background 0.2s;

    &:hover {
      color: var(--color-text-01);
      background: var(--color-secondary-hover);
    }

    &--active {
      color: var(--color-text-01);
      background: var(--color-base-04);
    }
  }

  &__nav-indicator {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 0.1875rem;
    background: transparent;
    transition: background 0.2s;

    .sidebar__nav-item--active & {
      background: var(--color-primary);
    }
  }

  &__nav-icon {
    flex-shrink: 0;
    width: 1.25rem;
    font-size: 1.25rem;
    text-align: center;
  }

  &__nav-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__footer {
    padding: 0.75rem 0;
  }

  &__nav-item--logout {
    cursor: pointer;

    &:hover {
      color: var(--color-negative-text) !important;
    }
  }
}
</style>