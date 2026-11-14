<template>
  <form
    class="auth-form"
    novalidate
    @submit="onSubmit"
  >
    <h1 class="auth-form__title">
      Вход в учётную запись
    </h1>

    <div class="auth-form__fields">
      <div class="auth-form__field">
        <label
          class="sr-only"
          for="login-email"
        >Электронная почта</label>
        <InputText
          id="login-email"
          v-model="email"
          v-bind="emailProps"
          type="email"
          name="email"
          autocomplete="username"
          placeholder="Электронная почта"
          :invalid="Boolean(errors.email)"
          fluid
        />
        <small
          v-if="errors.email"
          class="auth-form__error"
          role="alert"
        >{{ errors.email }}</small>
      </div>

      <div class="auth-form__field">
        <label
          class="sr-only"
          for="login-password"
        >Пароль</label>
        <InputText
          id="login-password"
          v-model="password"
          v-bind="passwordProps"
          type="password"
          name="password"
          autocomplete="current-password"
          placeholder="Пароль"
          :invalid="Boolean(errors.password)"
          fluid
        />
        <small
          v-if="errors.password"
          class="auth-form__error"
          role="alert"
        >{{ errors.password }}</small>
      </div>

      <Button
        class="auth-form__submit"
        type="submit"
        label="Войти"
        :loading="isSubmitting"
        fluid
      />
    </div>

    <div class="auth-form__footer">
      Нет аккаунта?
      <Button
        as="router-link"
        :to="{ name: 'register' }"
        class="auth-form__link"
        link
        label="Создать аккаунт"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useRouter } from 'vue-router'
import { signIn } from '../model/auth'
import { loginSchema, type LoginFormValues } from '../model/schemas'

const router = useRouter()

const { handleSubmit, errors, defineField, isSubmitting } = useForm<LoginFormValues>({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    email: '',
    password: '',
  },
})

const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')

const onSubmit = handleSubmit((values) => {
  signIn(values)

  const { redirect } = router.currentRoute.value.query
  router.push(typeof redirect === 'string' ? redirect : '/')
})
</script>

<style scoped lang="scss">
@use './auth-form' as form;

.auth-form {
  @include form.auth-form($fields-gap: 1.15rem, $submit-margin-top: 7rem);
}

.sr-only {
  @include form.sr-only;
}

@media (max-width: 760px) {
  .auth-form__submit {
    margin-top: 3.5rem;
  }
}
</style>
