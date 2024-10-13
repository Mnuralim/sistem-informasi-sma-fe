import React from 'react'
import { auth } from '@/auth'
import { getStudentAchievements } from '@/lib/student-achievement'
import AchievementsList from './components/student-achievement-list'
import { getStudents } from '@/lib/student'

const Page = async () => {
  const [session, studentAchievements, students] = await Promise.all([auth(), getStudentAchievements(), getStudents()])
  return (
    <section>
      <AchievementsList
        accessToken={session?.user.accessToken!}
        achievements={studentAchievements}
        students={students}
      />
    </section>
  )
}

export default Page
