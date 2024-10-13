import React from 'react'
import Form from './components/form'
import { getProfile } from '@/lib/profile'
import { auth } from '@/auth'

const Page = async () => {
  const [profile, session] = await Promise.all([getProfile(), auth()])

  return (
    <section>
      <h1 className="lg:text-4xl text-3xl font-bold text-[#202244] mx-5 mt-5 lg:mx-12">Visi & Misi Sekolah</h1>
      <Form
        id={profile.id}
        missionData={profile.mission}
        visionData={profile.vision}
        accessToken={session?.user.accessToken!}
      />
    </section>
  )
}

export default Page
