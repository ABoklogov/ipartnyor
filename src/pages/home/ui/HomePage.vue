<template>
  <div class="home-page">
    <header class="home-header">
      <h1>ipartnyor</h1>
      <button class="btn btn-logout" @click="handleLogout">
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

<style scoped>
.home-page {
  min-height: 100vh;
  background: var(--color-base-01, #25242a);
  color: var(--color-text-01, #fff);
}

.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: var(--color-base-02, #100f14);
  border-bottom: 1px solid var(--color-base-03, #2f3038);
}

.home-header h1 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
}

.btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-base-03, #2f3038);
  border-radius: 8px;
  background: transparent;
  color: var(--color-text-01, #fff);
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn:hover {
  background: var(--color-secondary-hover, rgba(255, 255, 255, 0.1));
}

.btn:active {
  background: var(--color-secondary-pressed, rgba(255, 255, 255, 0.2));
}

.home-content {
  padding: 3rem 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.welcome-card {
  background: var(--color-base-02, #100f14);
  border: 1px solid var(--color-base-03, #2f3038);
  border-radius: 12px;
  padding: 2rem;
}

.welcome-card h2 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
}

.text-muted {
  color: var(--color-text-02, #999);
  margin: 0;
}
</style>