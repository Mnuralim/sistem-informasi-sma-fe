import React from 'react'
import AchievementCard from './components/achievement-card'
import { getAchievements } from '@/lib/teacher-achievement'

const Page = async () => {
  const achievements = await getAchievements()
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-[#EB5437] font-semibold tracking-wide uppercase">Prestasi</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#202244] sm:text-4xl">
            Daftar Prestasi Guru dan Karyawan
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              photo={achievement.imageUrl}
              name={achievement.staffId ? achievement.staff!.name : achievement.teacher!.name}
              position={achievement.staffId ? achievement.staff!.position : achievement.teacher!.subject}
              achievement={achievement.award}
              year={achievement.year}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Page
