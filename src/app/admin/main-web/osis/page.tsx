import React from 'react'
import { auth } from '@/auth'
import { getOsis } from '@/lib/osis'
import OsisList from './components/osis-list'
import { getStudents } from '@/lib/student'

const Page = async () => {
  const [session, osis, students] = await Promise.all([auth(), getOsis(), getStudents()])
  return (
    <section>
      <OsisList accessToken={session?.user.accessToken!} osis={osis} students={students} />
    </section>
  )
}

export default Page
