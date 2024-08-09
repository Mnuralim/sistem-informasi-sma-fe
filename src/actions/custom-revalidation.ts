'use server'

import { revalidatePath } from 'next/cache'

export const customRevalidation = (path: string) => {
  revalidatePath(path)
}
