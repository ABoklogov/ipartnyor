<template>
  <div class="home-page">
    <header class="home-header">
      <h1>ipartnyor</h1>
      <button
        class="btn btn-logout"
        @click="handleLogout"
      >
        Выйти
      </button>
    </header>

    <main class="home-content">
      <div class="welcome-card">
        <h2>Добро пожаловать!</h2>
        <p class="text-muted">
          Вы успешно авторизованы. Здесь будет основное содержимое приложения.
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function handleLogout() {
  localStorage.removeItem('auth_token')
  router.push({ name: 'login' })
}
</script>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
  background: var(--color-base-01);
  color: var(--color-text-01);
}

.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: var(--color-base-02);
  border-bottom: 1px solid var(--color-base-03);

  h1 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
  }
}

.btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-base-03);
  border-radius: 8px;
  background: transparent;
  color: var(--color-text-01);
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: var(--color-secondary-hover);
  }

  &:active {
    background: var(--color-secondary-pressed);
  }
}

.home-content {
  margin: 0 auto;
  padding: 3rem 2rem;
  max-width: 800px;
}

.welcome-card {
  padding: 2rem;
  border: 1px solid var(--color-base-03);
  border-radius: 12px;
  background: var(--color-base-02);

  h2 {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
  }
}

.text-muted {
  margin: 0;
  color: var(--color-text-02);
}
</style>
