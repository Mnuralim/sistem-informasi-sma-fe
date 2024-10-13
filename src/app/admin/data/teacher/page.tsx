import React from 'react'
import { auth } from '@/auth'
import TeacherList from './components/teacher-list'
import { getTeacher } from '@/lib/teacher'

const Page = async () => {
  const [session, teachers] = await Promise.all([auth(), getTeacher()])
  return (
    <section>
      <TeacherList accessToken={session?.user.accessToken!} teachers={teachers} />
    </section>
  )
}

export default Page
