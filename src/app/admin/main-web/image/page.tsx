import React from 'react'
import { auth } from '@/auth'
import { getAllImageGallery } from '@/lib/image-gallery'
import GalleryList from './components/image-gallery-list'

const Page = async () => {
  const [imageGallery, session] = await Promise.all([getAllImageGallery(), auth()])
  return (
    <section>
      <GalleryList images={imageGallery} accessToken={session?.user.accessToken!} />
    </section>
  )
}

export default Page
