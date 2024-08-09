import Image from 'next/image'
import React from 'react'

const Page = () => {
  return (
    <section className=" py-16 mb-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:w-1/3 flex justify-center p-8 ">
            <Image
              src="/img/principal.jpeg"
              alt="Kepala Sekolah"
              width={300}
              height={300}
              className="rounded-full object-cover object-center shadow-lg aspect-square"
            />
          </div>
          <div className="md:w-2/3 p-8 md:p-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#202244] sm:text-4xl text-center md:text-left">
              Sambutan Komite Sekolah
            </h2>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed text-center md:text-left">
              Selamat datang di SMA Negeri 02 Lorem. Kami berkomitmen untuk memberikan pendidikan terbaik bagi setiap
              siswa, serta menciptakan lingkungan belajar yang inspiratif dan inklusif.
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed text-center md:text-left">
              Saya sangat bangga menjadi bagian dari sekolah ini dan berharap dapat bekerja sama dengan semua pihak
              untuk mencapai prestasi yang gemilang.
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed text-center md:text-left">
              Terima kasih atas dukungan Anda semua.
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed text-center md:text-left">
              Hormat kami,
              <br />
              <span className="font-semibold">Budi Santoso</span>
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
