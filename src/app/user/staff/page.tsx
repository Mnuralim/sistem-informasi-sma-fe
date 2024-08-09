import React from 'react'
import StaffCard from './components/staff-card'

const teachers = [
  {
    photo: '/img/principal.jpeg',
    name: 'Dr. Andi Setiawan',
    position: 'Kasubag Tata Usaha',
  },
  {
    photo: '/img/principal.jpeg',
    name: 'Budi Santoso, S.Pd.',
    position: 'Kasubag Tata Usaha',
  },
  {
    photo: '/img/principal.jpeg',
    name: 'Citra Dewi, M.Pd.',
    position: 'Kasubag Tata Usaha',
  },
  {
    photo: '/img/principal.jpeg',
    name: 'Dedi Kurniawan, S.Pd.',
    position: 'Kasubag Tata Usaha',
  },
  {
    photo: '/img/principal.jpeg',
    name: 'Eka Putri, S.Pd.',
    position: 'Kasubag Tata Usaha',
  },
]

const Page: React.FC = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-[#EB5437] font-semibold tracking-wide uppercase">Staff dan Tata Usaha</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#202244] sm:text-4xl">
            Daftar Staff dan Tata Usaha
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teachers.map((teacher, index) => (
            <StaffCard key={index} photo={teacher.photo} name={teacher.name} position={teacher.position} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Page
