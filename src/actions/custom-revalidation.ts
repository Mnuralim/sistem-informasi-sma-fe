'use server'

import { revalidatePath } from 'next/cache'

export const customRevalidation = (path: string[] | string, type?: 'page' | 'layout') => {
  if (Array.isArray(path)) {
    path.forEach((p) => revalidatePath(p, type ? type : 'page'))
  } else {
    revalidatePath(path, type ? type : 'page')
  }
}
