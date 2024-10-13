import { getHistory } from '@/lib/history'
import Image from 'next/image'
import React from 'react'

const Page = async () => {
  const history = await getHistory()
  return (
    <div className="bg-[#202244] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-orange-500 font-semibold tracking-wide uppercase">Sejarah Sekolah</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Sejarah Perjalanan Kami
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
            Berikut adalah perjalanan sejarah sekolah kami dari awal berdiri hingga sekarang.
          </p>
        </div>

        <div className="mt-10 space-y-12">
          <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <div className="md:w-1/3 w-full h-64 md:h-auto relative p-5">
              <Image
                src={history.foundingImageUrl}
                alt={'Awal Berdiri'}
                width={500}
                height={300}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
            <div className="md:w-2/3 w-full p-6">
              <h3 className="text-lg font-semibold text-[#202244]">Awal Berdiri</h3>
              <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: history.founding }}></div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <div className="md:w-1/3 w-full h-64 md:h-auto relative p-5">
              <Image
                src={history.developmentImageUrl}
                alt={'Perkembangan'}
                width={500}
                height={300}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
            <div className="md:w-2/3 w-full p-6">
              <h3 className="text-lg font-semibold text-[#202244]">Perkembangan</h3>
              <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: history.development }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
