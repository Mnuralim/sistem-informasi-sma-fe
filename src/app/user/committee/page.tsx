import { getWelcomeMessage } from '@/lib/welcome-message'
import Image from 'next/image'
import React from 'react'

const Page = async () => {
  const welcomeMessage = await getWelcomeMessage('committee')

  return (
    <section className="py-16 mb-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="md:w-1/3 flex justify-center p-8">
            <Image
              src={welcomeMessage.teacher.imageUrl}
              alt="Komite Sekolah"
              width={300}
              height={300}
              className="rounded-full object-cover object-center shadow-lg aspect-square hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="md:w-2/3 p-8 md:p-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#202244] sm:text-4xl text-center md:text-left">
              Sambutan Komite Sekolah
            </h2>
            <div
              className="text-gray-700 leading-relaxed mt-4"
              dangerouslySetInnerHTML={{ __html: welcomeMessage.message }}
            ></div>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed text-center md:text-left">
              Hormat kami,
              <br />
              <span className="font-semibold">{welcomeMessage.teacher.name}</span>
              <br />
              Komite Sekolah
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page
