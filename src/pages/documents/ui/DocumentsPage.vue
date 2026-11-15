<template>
  <div class="page-placeholder">
    <i class="pi pi-file page-placeholder__icon" />
    <h1 class="page-placeholder__title">Документы</h1>
    <p class="page-placeholder__desc">Список и управление документами.</p>
  </div>
</template>

<style scoped lang="scss">
.page-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;

  &__icon {
    font-size: 3rem;
    color: var(--color-primary);
    margin-bottom: 1rem;
  }

  &__title {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  &__desc {
    margin: 0;
    color: var(--color-text-02);
    font-size: 0.95rem;
  }
}
</style>