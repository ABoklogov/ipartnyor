<template>
  <AuthLayout>
    <section class="auth-form">
      <h1>Создание учётной записи</h1>

      <form
        class="auth-form__fields"
        @submit.prevent="handleRegister"
      >
        <label
          class="sr-only"
          for="register-name"
        >Имя</label>
        <input
          id="register-name"
          v-model="name"
          class="auth-form__input"
          type="text"
          autocomplete="name"
          placeholder="Имя"
          required
        >

        <label
          class="sr-only"
          for="register-email"
        >Электронная почта</label>
        <input
          id="register-email"
          v-model="email"
          class="auth-form__input"
          type="email"
          autocomplete="email"
          placeholder="Электронная почта"
          required
        >

        <label
          class="sr-only"
          for="register-password"
        >Пароль</label>
        <input
          id="register-password"
          v-model="password"
          class="auth-form__input"
          type="password"
          autocomplete="new-password"
          placeholder="Пароль"
          required
        >

        <label
          class="sr-only"
          for="register-confirm-password"
        >Повторите пароль</label>
        <input
          id="register-confirm-password"
          v-model="confirmPassword"
          class="auth-form__input"
          type="password"
          autocomplete="new-password"
          placeholder="Повторите пароль"
          required
        >

        <button
          class="auth-form__submit"
          type="submit"
        >
          <span>Зарегистрироваться</span>
          <span
            class="auth-form__arrow"
            aria-hidden="true"
          >›</span>
        </button>
      </form>

      <div class="auth-form__footer">
        <span>Уже есть аккаунт? </span>
        <router-link
          class="auth-form__secondary-link"
          :to="{ name: 'login' }"
        >
          Войти
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
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

function handleRegister() {
  if (password.value !== confirmPassword.value) return

  // Заглушка регистрации до подключения API.
  localStorage.setItem('auth_token', 'demo-token')
  router.push('/')
}
</script>

<style scoped lang="scss">
@use '../../../../shared/styles' as auth;

.auth-form {
  @include auth.auth-form($fields-gap: 0.9rem, $submit-margin-top: 2.8rem);
}

.sr-only {
  @include auth.sr-only;
}
</style>
