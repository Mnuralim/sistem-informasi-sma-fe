import Link from 'next/link'
import React from 'react'
import { FaDownload } from 'react-icons/fa'

const downloadItems = [
  { title: 'Kalender Pendidikan 2022-2023', link: '/downloads/kalender-pendidikan-2022-2023.pdf' },
  { title: 'Informasi PPDB KKO 2022-2023', link: '/downloads/informasi-ppdb-kko-2022-2023.pdf' },
  { title: 'Pamplet PPDB KKO 2022-2023', link: '/downloads/pamplet-ppdb-kko-2022-2023.pdf' },
  {
    title: 'Juknis PPDB Online Nomor 1070/perka/2019 Pengganti Perka Dinas Dikpora DIY Nomor 0885/Perka/2019',
    link: '/downloads/juknis-ppdb-online-2019.pdf',
  },
  { title: 'Alur proses pendaftaran PPDB 2019', link: '/downloads/alur-ppdb-2019.pdf' },
]

const Page = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-orange-05 font-semibold tracking-wide uppercase">Unduhan</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#202244] sm:text-4xl">
            File yang Dapat Diunduh
          </p>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {downloadItems.map((item, index) => (
              <li key={index} className="px-4 py-4 sm:px-6 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-base lg:text-lg leading-6 font-medium text-gray-900">{item.title}</h3>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <Link
                    href={item.link}
                    download
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-05 hover:bg-[#d94e34] transition-colors duration-300"
                  >
                    <FaDownload className="mr-2 transition-transform duration-200 group-hover:scale-110" />
                    Unduh
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Page
