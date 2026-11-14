<template>
  <div class="register-page">
    <div class="register-card">
      <h1>Регистрация</h1>
      <p class="text-muted">Создайте новый аккаунт</p>

      <form @submit.prevent="handleRegister">
        <div class="field">
          <label for="name">Имя</label>
          <input
            id="name"
            v-model="name"
            type="text"
            class="input"
            placeholder="Иван Иванов"
            required
          />
        </div>

        <div class="field">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="input"
            placeholder="your@email.com"
            required
          />
        </div>

        <div class="field">
          <label for="password">Пароль</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="input"
            placeholder="••••••••"
            required
          />
        </div>

        <div class="field">
          <label for="confirm-password">Подтвердите пароль</label>
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            class="input"
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Зарегистрироваться
        </button>
      </form>

      <p class="login-link">
        Уже есть аккаунт?
        <router-link :to="{ name: 'login' }">Войти</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

function handleRegister() {
  // Заглушка: сохраняем токен и редиректим
  localStorage.setItem('auth_token', 'demo-token')
  router.push('/')
}
</script>

<style scoped>
.register-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--color-base-01, #25242a);
}

.register-card {
  background: var(--color-base-02, #100f14);
  border: 1px solid var(--color-base-03, #2f3038);
  border-radius: 12px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
}

.register-card h1 {
  margin: 0 0 0.25rem;
  font-size: 1.5rem;
  color: var(--color-text-01, #fff);
}

.text-muted {
  color: var(--color-text-02, #999);
  margin: 0 0 1.5rem;
}

.field {
  margin-bottom: 1rem;
}

.field label {
  display: block;
  margin-bottom: 0.375rem;
  font-size: 0.875rem;
  color: var(--color-text-02, #999);
}

.input {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid var(--color-base-03, #2f3038);
  border-radius: 8px;
  background: var(--color-base-01, #25242a);
  color: var(--color-text-01, #fff);
  font-size: 0.875rem;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.input:focus {
  border-color: var(--color-primary, #597719);
}

.btn {
  width: 100%;
  padding: 0.625rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
}

.btn-primary {
  background: var(--color-primary, #597719);
  color: #fff;
}

.btn-primary:hover {
  background: var(--color-primary-hover, #6b8c1f);
}

.btn-primary:active {
  background: var(--color-primary-pressed, #4a6314);
}

.login-link {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-text-02, #999);
}

.login-link a {
  color: var(--color-link, #7da822);
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>