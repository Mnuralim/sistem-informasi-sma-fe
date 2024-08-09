import { object, string } from 'zod'
export const signInSchema = object({
  email: string({ required_error: 'Email wajib diisi' }).min(1, 'Email wajib diisi').email('Email tidak valid'),
  password: string({ required_error: 'Password wajib diisi' })
    .min(1, 'Password wajib diisi')
    .min(6, 'Password harus memiliki minimal 6 karakter')
    .max(32, 'Kata sandi harus kurang dari 32 karakter'),
})
