'use server'

import { revalidatePath } from 'next/cache'

export const customRevalidation = (path: string[] | string) => {
  if (Array.isArray(path)) {
    path.forEach((p) => revalidatePath(p))
  } else {
    revalidatePath(path)
  }
}
