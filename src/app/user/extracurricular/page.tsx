// pages/extracurriculars.tsx
import React from 'react'
import Extracurricular from './components/extracurricular'

const extracurriculars = [
  {
    name: 'Paskibra',
    description: 'Paskibra adalah kegiatan ekstrakurikuler yang bergerak di bidang pengibaran bendera.',
    photo: '/img/misi.png',
  },
  {
    name: 'Pramuka',
    description: 'Pramuka adalah organisasi pendidikan yang fokus pada pembentukan karakter dan keterampilan.',
    photo: '/img/misi.png',
  },
  {
    name: 'KIR (Karya Ilmiah Remaja)',
    description: 'KIR adalah kegiatan ekstrakurikuler yang mengembangkan minat siswa dalam bidang penelitian ilmiah.',
    photo: '/img/misi.png',
  },
  {
    name: 'PMR (Palang Merah Remaja)',
    description: 'PMR adalah kegiatan ekstrakurikuler yang bergerak di bidang kesehatan dan kemanusiaan.',
    photo: '/img/misi.png',
  },
  {
    name: 'Basket',
    description: 'Ekstrakurikuler basket untuk mengembangkan kemampuan siswa dalam bermain bola basket.',
    photo: '/img/misi.png',
  },
]

const ExtracurricularsPage: React.FC = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-[#EB5437] font-semibold tracking-wide uppercase">Ekstrakurikuler</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#202244] sm:text-4xl">
            Daftar Ekstrakurikuler
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {extracurriculars.map((activity, index) => (
            <Extracurricular
              key={index}
              name={activity.name}
              description={activity.description}
              photo={activity.photo}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExtracurricularsPage
