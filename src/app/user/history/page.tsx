import Image from 'next/image'
import React from 'react'

const historyData = [
  {
    title: 'Awal Berdiri',
    description:
      'Sekolah kami didirikan pada tahun XXXX dengan tujuan memberikan pendidikan berkualitas bagi masyarakat sekitar.',
    image: '/img/misi.png',
  },
  {
    title: 'Perkembangan',
    description:
      'Seiring berjalannya waktu, sekolah kami terus berkembang dengan berbagai prestasi dan fasilitas yang semakin lengkap.',
    image: '/img/misi.png',
  },
]

const Page = () => {
  return (
    <div className="bg-[#202244] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-[#EB5437] font-semibold tracking-wide uppercase">Sejarah Sekolah</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Sejarah Perjalanan Kami
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
            Berikut adalah perjalanan sejarah sekolah kami dari awal berdiri hingga sekarang.
          </p>
        </div>

        <div className="mt-10 space-y-12">
          {historyData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="md:w-1/3 w-full h-64 md:h-auto relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 w-full p-6">
                <h3 className="text-lg font-semibold text-[#202244]">{item.title}</h3>
                <p className="mt-4 text-base text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
