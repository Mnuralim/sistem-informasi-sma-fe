// pages/achievements.tsx
import React from 'react'
import AchievementCard from './components/achievement-card'

const achievements = [
  {
    photo: '/img/principal.jpeg',
    name: 'Dr. Andi Setiawan',
    position: 'Kepala Sekolah',
    achievement: 'Juara 1 Lomba Inovasi Pendidikan',
    year: '2022',
  },
  {
    photo: '/img/principal.jpeg',
    name: 'Budi Santoso, S.Pd.',
    position: 'Wakil Kepala Sekolah',
    achievement: 'Penghargaan Guru Teladan',
    year: '2021',
  },
  {
    photo: '/img/principal.jpeg',
    name: 'Citra Dewi, M.Pd.',
    position: 'Guru Senior',
    achievement: 'Juara 2 Lomba Karya Tulis Ilmiah',
    year: '2020',
  },
  {
    photo: '/img/principal.jpeg',
    name: 'Dian Kurniawan',
    position: 'Staff Administrasi',
    achievement: 'Penghargaan Karyawan Berprestasi',
    year: '2021',
  },
  {
    photo: '/img/principal.jpeg',
    name: 'Eka Putri',
    position: 'Staff Keuangan',
    achievement: 'Juara 3 Lomba Akuntansi',
    year: '2019',
  },
]

const Page: React.FC = () => {
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
              photo={achievement.photo}
              name={achievement.name}
              position={achievement.position}
              achievement={achievement.achievement}
              year={achievement.year}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Page
