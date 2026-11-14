<template>
  <AuthLayout>
    <section class="auth-form">
      <h1>Вход в учётную запись</h1>

      <form
        class="auth-form__fields"
        @submit.prevent="handleLogin"
      >
        <label
          class="sr-only"
          for="login-email"
        >Электронная почта</label>
        <input
          id="login-email"
          v-model="email"
          class="auth-form__input"
          type="email"
          autocomplete="username"
          placeholder="Электронная почта"
          required
        >

        <label
          class="sr-only"
          for="login-password"
        >Пароль</label>
        <input
          id="login-password"
          v-model="password"
          class="auth-form__input"
          type="password"
          autocomplete="current-password"
          placeholder="Пароль"
          required
        >

        <button
          class="auth-form__submit"
          type="submit"
        >
          <span>Войти</span>
          <span
            class="auth-form__arrow"
            aria-hidden="true"
          >›</span>
        </button>
      </form>

      <div class="auth-form__footer">
        <router-link
          class="auth-form__secondary-link"
          :to="{ name: 'register' }"
        >
          Создать аккаунт
        </router-link>
      </div>
    </section>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthLayout } from '@/widgets/auth-layout'

const router = useRouter()
const email = ref('')
const password = ref('')

function handleLogin() {
  // Заглушка авторизации до подключения API.
  localStorage.setItem('auth_token', 'demo-token')
  const redirect = (router.currentRoute.value.query.redirect as string) || '/'
  router.push(redirect)
}
</script>

<style scoped lang="scss">
@use '../../../../shared/styles' as auth;

.auth-form {
  @include auth.auth-form($fields-gap: 1.15rem, $submit-margin-top: 7rem);
}

.sr-only {
  @include auth.sr-only;
}

@media (max-width: 760px) {
  .auth-form {
    &__submit {
      margin-top: 3.5rem;
    }
  }
}
</style>
