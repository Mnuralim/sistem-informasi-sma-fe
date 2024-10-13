import { getWelcomeMessage } from '@/lib/welcome-message'
import Image from 'next/image'
import React from 'react'

const Page = async () => {
  const welcomeMessage = await getWelcomeMessage('headmaster')
  if (!welcomeMessage) {
    return <div>Not found</div>
  }
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start justify-center bg-white shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
          <div className="md:w-1/3 flex justify-center p-8">
            <Image
              src={welcomeMessage.teacher.imageUrl}
              alt="Kepala Sekolah"
              width={300}
              height={300}
              className="rounded-full shadow-lg aspect-square object-cover object-center hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="md:w-2/3 p-8 md:p-12">
            <h2 className="text-3xl mb-3 font-bold tracking-tight text-[#202244] sm:text-4xl text-center md:text-left">
              Sambutan Kepala Sekolah
            </h2>
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: welcomeMessage?.message,
              }}
            ></div>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed text-center md:text-left">
              Hormat kami,
              <br />
              <span className="font-semibold">{welcomeMessage.teacher.name}</span>
              <br />
              Kepala Sekolah
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page
