import React from 'react'
import Extracurricular from './components/extracurricular'
import { getExtracurricular } from '@/lib/extracurricular'

const ExtracurricularsPage = async () => {
  const extracurriculars = await getExtracurricular()
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
              imageUrl={activity.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExtracurricularsPage
