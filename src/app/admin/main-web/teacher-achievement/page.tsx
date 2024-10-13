import React from 'react'
import { auth } from '@/auth'
import AchievementsList from './components/achievement-list'
import { getTeacher } from '@/lib/teacher'
import { getStaff } from '@/lib/staff'
import { getAchievements } from '@/lib/teacher-achievement'

interface Props {
  searchParams: {
    type: 'teacher' | 'staff'
  }
}

const Page = async ({ searchParams }: Props) => {
  const [session, achievements] = await Promise.all([auth(), getAchievements()])
  let dataEntity: ITeacher[] | IStaff[]
  if (searchParams.type === 'teacher') {
    dataEntity = await getTeacher()
  } else if (searchParams.type === 'staff') {
    dataEntity = await getStaff()
  } else {
    dataEntity = []
  }
  return (
    <section>
      <AchievementsList accessToken={session?.user.accessToken!} achievements={achievements} dataEntity={dataEntity} />
    </section>
  )
}

export default Page
