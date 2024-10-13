import React from 'react'
import { auth } from '@/auth'
import StudentList from './components/student-list'
import { getAllGrades, getStudents } from '@/lib/student'

const Page = async () => {
  const [session, teachers, grades] = await Promise.all([auth(), getStudents(), getAllGrades()])
  return (
    <section>
      <StudentList accessToken={session?.user.accessToken!} students={teachers} grades={grades} />
    </section>
  )
}

export default Page
