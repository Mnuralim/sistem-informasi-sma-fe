// pages/student-achievements.tsx
import React from 'react'
import StudentAchievement from './components/student-achievement'

const students = [
  {
    photo: '/img/slide1.jpg',
    name: 'Andi Setiawan',
    achievement: 'Juara 1 Olimpiade Matematika Nasional',
    studentClass: 'Kelas XII IPA 1',
    quote: 'Belajar dengan tekun dan semangat akan membawa kita ke puncak prestasi.',
  },
  {
    photo: '/img/slide1.jpg',
    name: 'Budi Santoso',
    achievement: 'Juara 2 Lomba Debat Bahasa Inggris Tingkat Provinsi',
    studentClass: 'Kelas XI IPS 2',
    quote: 'Kesuksesan adalah hasil dari kerja keras dan dedikasi.',
  },
  {
    photo: '/img/slide1.jpg',
    name: 'Citra Dewi',
    achievement: 'Juara 1 Lomba Menulis Puisi Nasional',
    studentClass: 'Kelas X IPA 3',
    quote: 'Puisi adalah ekspresi jiwa yang paling murni.',
  },
]

const Page: React.FC = () => {
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
          {students.map((student, index) => (
            <StudentAchievement
              key={index}
              photo={student.photo}
              name={student.name}
              achievement={student.achievement}
              studentClass={student.studentClass}
              quote={student.quote}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Page
