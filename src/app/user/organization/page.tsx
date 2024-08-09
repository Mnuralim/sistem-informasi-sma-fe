import React from 'react'
import Image from 'next/image'

const Page = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-[#EB5437] font-semibold tracking-wide uppercase">Struktur Organisasi</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#202244] sm:text-4xl">
            Struktur Organisasi Sekolah
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center">
          <Image width={1000} height={2000} alt="structure" src={'/img/structure.jpeg'} className="w-full h-auto" />
        </div>
      </div>
    </section>
  )
}

export default Page
