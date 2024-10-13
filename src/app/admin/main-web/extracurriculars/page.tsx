import React from 'react'
import { getExtracurricular } from '@/lib/extracurricular'
import { auth } from '@/auth'
import ExtracurricularsList from './components/extracurriculars-list'

const Page = async () => {
  const [session, extracurriculars] = await Promise.all([auth(), getExtracurricular()])
  return (
    <section>
      <ExtracurricularsList extracurriculars={extracurriculars} accessToken={session?.user.accessToken!} />
    </section>
  )
}

export default Page
