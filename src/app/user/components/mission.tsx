import React from 'react'
import Image from 'next/image'

interface Props {
  mission: string
  schoolName: string
}

const Mission = ({ mission, schoolName }: Props) => {
  const items = mission.split('\n')
  return (
    <section className="py-10 lg:py-20 px-5 lg:px-0 bg-[#f9f9fa]">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-orange-05 text-center font-bold text-2xl lg:text-3xl transition-opacity duration-300 ease-in-out">
          Misi {schoolName}
        </h1>
        <div className="grid lg:grid-cols-2 gap-5 mt-5">
          {items.map((item, index) => (
            <figure
              key={index}
              className="flex items-start bg-white gap-5 p-7 sm:flex-wrap lg:flex-nowrap aspect-auto shadow-1 rounded-3xl"
            >
              <div className="w-12 h-12 aspect-square bg-[#FF9F40] rounded-2xl text-xl flex items-center justify-center font-bold text-white">
                {index + 1}
              </div>
              <p data-cy="misi-content">{item}</p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Mission
