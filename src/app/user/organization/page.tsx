import React from 'react'
import Image from 'next/image'
import { getStructuralOrganization } from '@/lib/structural-organization'

const Page = async () => {
  const organization = await getStructuralOrganization()
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-orange-05 font-semibold tracking-wide uppercase">Struktur Organisasi</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#202244] sm:text-4xl">
            Struktur Organisasi Sekolah
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center">
          <Image
            width={1000}
            height={2000}
            alt="structure"
            src={organization?.imageUrl || 'https://via.placeholder.com/800x400?text=Struktur+Organisasi'}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  )
}

export default Page
