import { z } from 'zod'

/** Почта: обязательна и должна быть валидным адресом. */
export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Укажите электронную почту')
  .email('Некорректный адрес электронной почты')

/** Пароль: любые символы, минимум 6 символов. */
export const passwordSchema = z
  .string()
  .min(1, 'Укажите пароль')
  .min(6, 'Пароль должен содержать минимум 6 символов')

/** Имя: минимум 2 символа. */
export const nameSchema = z
  .string()
  .trim()
  .min(1, 'Укажите имя')
  .min(2, 'Имя должно содержать минимум 2 символа')

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const registerSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Повторите пароль'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
