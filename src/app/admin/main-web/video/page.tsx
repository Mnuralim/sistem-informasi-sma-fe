import React from 'react'
import { getAllVideoGallery } from '@/lib/video-gallery'
import { auth } from '@/auth'
import VideoGalleryList from './components/video-gallery-list'

const Page = async () => {
  const [videos, session] = await Promise.all([getAllVideoGallery(), auth()])
  return (
    <section>
      <VideoGalleryList videosData={videos} accessToken={session?.user.accessToken!} />
    </section>
  )
}

export default Page
