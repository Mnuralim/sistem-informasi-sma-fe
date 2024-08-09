import React from 'react'
import ImageProfile from './components/image-profile'
import Form from './components/form'
import { getProfile } from '@/lib/profile'
import { auth } from '@/auth'

const Page = async () => {
  const session = await auth()
  const profile = await getProfile()

  return (
    <section className="w-full my-5">
      <h1 className="lg:text-4xl text-3xl font-bold text-gray-800 mx-5 mt-5 lg:mx-12">Profile Sekolah</h1>
      <div className="grid lg:grid-cols-3 mt-5 mx-5 gap-x-10 gap-y-8 lg:mx-12">
        <div className="lg:col-span-1">
          <ImageProfile url={profile.imageUrl} accessToken={session?.user.accessToken!!} />
        </div>
        <div className="lg:col-span-2 mb-10">
          <Form profile={profile} accessToken={session?.user.accessToken!!} />
        </div>
      </div>
    </section>
  )
}

export default Page
