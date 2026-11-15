<template>
  <header class="app-header">
    <div class="app-header__start">
      <slot name="start" />
    </div>
    <div class="app-header__center">
      <slot name="center" />
    </div>
    <div class="app-header__end">
      <slot name="end" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  display: flex;
  align-items: center;
  height: 3.5rem;
  padding: 0 1.5rem;
  background: var(--color-base-02);
  border-bottom: 1px solid var(--color-base-03);

  &__start {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__center {
    flex: 1;
    text-align: center;
  }

  &__end {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>