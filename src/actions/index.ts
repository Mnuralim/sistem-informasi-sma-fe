'use server'

import { AuthError } from 'next-auth'
import { signIn } from '@/auth'
import { signInSchema } from '@/utils/zod'

export async function credentialLogin(formData: FormData, redirectUrl: string) {
  const result = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!result.success) {
    return { error: result.error.errors.map((e) => e.message).join(', ') }
  }

  const { email, password } = result.data

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    return { success: true, callbackUrl: redirectUrl }
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: error.message.split('.')[0],
      }
    }
    return {
      error: 'Terjadi kesalahan yang tidak terduga',
    }
  }
}
