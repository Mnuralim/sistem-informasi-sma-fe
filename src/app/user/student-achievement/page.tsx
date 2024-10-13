import React from 'react'
import StudentAchievement from './components/student-achievement'
import { getStudentAchievements } from '@/lib/student-achievement'

const Page = async () => {
  const achievements = await getStudentAchievements()

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-[#EB5437] font-semibold tracking-wide uppercase">Siswa Berprestasi</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#202244] sm:text-4xl">
            Daftar Siswa Berprestasi
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <StudentAchievement
              key={index}
              imageUrl={achievement.imageUrl}
              name={achievement.student.name}
              description={achievement.description}
              grade={achievement.student.class.name}
              quotes={achievement.quotes}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Page
