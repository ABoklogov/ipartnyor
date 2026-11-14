<template>
  <form
    class="auth-form"
    novalidate
    @submit="onSubmit"
  >
    <h1 class="auth-form__title">
      Создание учётной записи
    </h1>

    <div class="auth-form__fields">
      <div class="auth-form__field">
        <label
          class="sr-only"
          for="register-name"
        >Имя</label>
        <InputText
          id="register-name"
          v-model="name"
          v-bind="nameProps"
          type="text"
          name="name"
          autocomplete="name"
          placeholder="Имя"
          :invalid="Boolean(errors.name)"
          fluid
        />
        <small
          v-if="errors.name"
          class="auth-form__error"
          role="alert"
        >{{ errors.name }}</small>
      </div>

      <div class="auth-form__field">
        <label
          class="sr-only"
          for="register-email"
        >Электронная почта</label>
        <InputText
          id="register-email"
          v-model="email"
          v-bind="emailProps"
          type="email"
          name="email"
          autocomplete="email"
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
          for="register-password"
        >Пароль</label>
        <InputText
          id="register-password"
          v-model="password"
          v-bind="passwordProps"
          type="password"
          name="password"
          autocomplete="new-password"
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

      <div class="auth-form__field">
        <label
          class="sr-only"
          for="register-confirm-password"
        >Повторите пароль</label>
        <InputText
          id="register-confirm-password"
          v-model="confirmPassword"
          v-bind="confirmPasswordProps"
          type="password"
          name="confirmPassword"
          autocomplete="new-password"
          placeholder="Повторите пароль"
          :invalid="Boolean(errors.confirmPassword)"
          fluid
        />
        <small
          v-if="errors.confirmPassword"
          class="auth-form__error"
          role="alert"
        >{{ errors.confirmPassword }}</small>
      </div>

      <Button
        class="auth-form__submit"
        type="submit"
        label="Зарегистрироваться"
        :loading="isSubmitting"
        fluid
      />
    </div>

    <div class="auth-form__footer">
      Уже есть аккаунт?
      <Button
        as="router-link"
        :to="{ name: 'login' }"
        class="auth-form__link"
        link
        label="Войти"
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
import { signUp } from '../model/auth'
import { registerSchema, type RegisterFormValues } from '../model/schemas'

const router = useRouter()

const { handleSubmit, errors, defineField, isSubmitting } = useForm<RegisterFormValues>({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
})

const [name, nameProps] = defineField('name')
const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')
const [confirmPassword, confirmPasswordProps] = defineField('confirmPassword')

const onSubmit = handleSubmit((values) => {
  signUp(values)
  router.push('/')
})
</script>

<style scoped lang="scss">
@use './auth-form' as form;

.auth-form {
  @include form.auth-form($fields-gap: 0.9rem, $submit-margin-top: 2.8rem);
}

.sr-only {
  @include form.sr-only;
}
</style>