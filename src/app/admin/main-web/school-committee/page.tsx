import React from 'react'
import { auth } from '@/auth'
import TeacherList from './components/list'
import { getTeacher } from '@/lib/teacher'

const Page = async () => {
  const [session, teacher] = await Promise.all([auth(), getTeacher('committe')])
  return (
    <section>
      <TeacherList accessToken={session?.user.accessToken!} teacher={teacher[0]} />
    </section>
  )
}

export default Page
