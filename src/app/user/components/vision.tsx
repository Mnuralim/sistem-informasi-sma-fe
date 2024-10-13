import React from 'react'
import Image from 'next/image'

interface Props {
  vision: string
}

const Vision = ({ vision }: Props) => {
  return (
    <section id="vision" className="py-10 lg:py-20 px-5 lg:px-0">
      <div className="grid lg:grid-cols-2 gap-y-10 gap-x-14 items-center w-full max-w-7xl mx-auto">
        <div className="w-full mx-auto h-auto rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
          <Image
            src="/img/visi.png"
            alt="Visi Sekolah"
            width={500}
            height={500}
            className="w-full h-auto rounded-lg object-cover"
            priority={true}
            draggable={false}
          />
        </div>

        <div className="lg:pl-10 text-center lg:text-left space-y-5">
          <h1 className="text-orange-05 font-bold text-2xl lg:text-3xl transition-opacity duration-300 ease-in-out">
            Visi Kami Untuk Pendidikan Berkualitas
          </h1>
          <div
            className="font-medium text-base lg:text-lg leading-relaxed text-gray-700 transition-opacity duration-300 ease-in-out"
            dangerouslySetInnerHTML={{ __html: vision }}
          ></div>
        </div>
      </div>
    </section>
  )
}

export default Vision
