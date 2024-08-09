'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoIosArrowDown, IoMdLogOut } from 'react-icons/io'
import { FaInfoCircle, FaPhone } from 'react-icons/fa'
import { AiOutlineHome } from 'react-icons/ai'
import Image from 'next/image'
import { IoMdClose } from 'react-icons/io'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { IoMdGlobe } from 'react-icons/io'
import { RxHamburgerMenu } from 'react-icons/rx'

const sideBarItems = [
  {
    name: 'Beranda',
    icon: <AiOutlineHome className="text-xl md:text-2xl lg:text-3xl" />,
    subitems: [],
    path: '/admin/home',
  },
  {
    name: 'Tampilan Web Utama',
    icon: <IoMdGlobe className="text-xl md:text-2xl lg:text-3xl" />,
    subitems: [
      { name: 'Profile Sekolah', path: '/admin/profile', icons: <FaInfoCircle className="text-lg md:text-xl" /> },
      { name: 'Slider Beranda', path: '/admin/slider', icons: <FaInfoCircle className="text-lg md:text-xl" /> },
      { name: 'Berita', path: '/admin/news', icons: <FaInfoCircle className="text-lg md:text-xl" /> },
      { name: 'Sejarah', path: '/admin/history', icons: <FaPhone className="text-lg md:text-xl" /> },
      { name: 'Visi dan Misi', path: '/admin/vision-mission', icons: <FaPhone className="text-lg md:text-xl" /> },
      { name: 'Struktur Organisasi', path: '/admin/organization', icons: <FaPhone className="text-lg md:text-xl" /> },
      { name: 'Sambutan Kepala Sekolah', path: '/admin/headmaster', icons: <FaPhone className="text-lg md:text-xl" /> },
      { name: 'Sambutan Komite Sekolah', path: '/admin/committee', icons: <FaPhone className="text-lg md:text-xl" /> },
      { name: 'Foto', path: '/admin/image', icons: <FaPhone className="text-lg md:text-xl" /> },
      { name: 'Video', path: '/admin/video', icons: <FaPhone className="text-lg md:text-xl" /> },
      { name: 'Laporan Keuangan', path: '/admin/finance-report', icons: <FaPhone className="text-lg md:text-xl" /> },
      { name: 'Ekstrakurikuler', path: '/admin/extracurriculars', icons: <FaPhone className="text-lg md:text-xl" /> },
      { name: 'Prestasi Siswa', path: '/admin/student-achievement', icons: <FaPhone className="text-lg md:text-xl" /> },
      { name: 'OSIS', path: '/admin/osis', icons: <FaPhone className="text-lg md:text-xl" /> },
      { name: 'Daftar Guru', path: '/admin/teacher', icons: <FaPhone className="text-lg md:text-xl" /> },
      { name: 'Daftar Staff Tata Usaha', path: '/admin/staff', icons: <FaPhone className="text-lg md:text-xl" /> },
      {
        name: 'Prestasi Guru dan Karyawan',
        path: '/admin/achievement',
        icons: <FaPhone className="text-lg md:text-xl" />,
      },
      { name: 'Blog', path: '/admin/blog', icons: <FaPhone className="text-lg md:text-xl" /> },
    ],
    path: null,
  },
]

const Sidebar = () => {
  const [expandView, setExpandView] = useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (path: string) => {
    router.push(path)
    if (window.innerWidth < 768) {
      setExpandView(false)
    }
  }

  const isActivePath = (path: string) => {
    const normalizedPathname = pathname.endsWith('/') ? pathname : `${pathname}/`
    const normalizedPath = path.endsWith('/') ? path : `${path}/`
    return normalizedPathname === normalizedPath || normalizedPathname.startsWith(normalizedPath)
  }

  if (pathname === '/admin/login') {
    return null
  }

  return (
    <aside
      className={`fixed z-40 left-0 h-screen bg-dark-blue transition-all transform ease-linear duration-200 no-scrollbar overflow-y-auto ${
        expandView ? 'w-4/5 md:w-3/5 lg:w-1/5' : 'w-[12.666667%] lg:w-1/5'
      }`}
    >
      <div className="mt-5 h-full flex flex-col justify-between">
        <div>
          <div
            className={`flex items-center ${expandView ? 'justify-between px-2 lg:justify-center' : 'justify-center'}`}
          >
            <div className={`items-center ${expandView ? 'flex lg:flex-col' : 'hidden lg:flex lg:flex-col'}`}>
              <Image
                width={500}
                height={500}
                alt="logo"
                src={'/img/logo.png'}
                className="aspect-square rounded-full w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16"
              />
              <h1 className="text-xs md:text-sm lg:text-base text-orange-05 font-semibold">SMA Negeri 2 Lorem</h1>
            </div>
            <div className="lg:hidden">
              <button onClick={() => setExpandView((prev) => !prev)} className="text-white bg-orange-05 p-2">
                {expandView ? (
                  <IoMdClose className="text-lg md:text-xl lg:text-2xl" />
                ) : (
                  <RxHamburgerMenu className="text-lg md:text-xl lg:text-2xl" />
                )}
              </button>
            </div>
          </div>
          <div className={`mt-10 text-white ${expandView ? '' : 'flex justify-between items-center flex-col'}`}>
            {sideBarItems.map((item) => (
              <Disclosure key={item.name}>
                <>
                  <DisclosureButton
                    className={`flex items-center w-full ${
                      expandView ? 'w-full py-3 px-3 justify-between' : 'w-fit p-3 justify-center lg:justify-between'
                    } ${isActivePath(item.path || '') ? 'bg-orange-05' : ''}`}
                    onClick={() => {
                      if (item.path) {
                        handleNavigation(item.path)
                      } else {
                        setExpandView(true)
                      }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <p
                        className={`text-xs md:text-sm lg:text-base font-bold line-clamp-1 ${
                          expandView ? 'block' : 'hidden lg:block'
                        }`}
                      >
                        {item.name}
                      </p>
                    </div>
                    <IoIosArrowDown
                      size={22}
                      className={`${expandView && item.subitems.length !== 0 ? 'block' : 'hidden'}`}
                    />
                  </DisclosureButton>
                  {expandView ? (
                    <DisclosurePanel
                      transition
                      className={
                        'flex flex-col items-start origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0'
                      }
                    >
                      {item.subitems.map((sub) => (
                        <button
                          key={sub.name}
                          onClick={() => handleNavigation(sub.path)}
                          className={`py-2 w-full text-xs md:text-sm lg:text-base text-start pl-[42px] ${
                            isActivePath(sub.path) ? 'bg-orange-05' : ''
                          }`}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </DisclosurePanel>
                  ) : null}
                </>
              </Disclosure>
            ))}
          </div>
        </div>
        <div
          className={`mt-10 text-white pb-24 lg:pb-16 ${
            expandView ? 'px-3' : 'flex justify-between items-center flex-col lg:items-baseline lg:px-3'
          }`}
        >
          <button className="flex items-center gap-2">
            <IoMdLogOut className="text-lg md:text-xl lg:text-2xl" />
            <span className={`text-xs md:text-sm lg:text-base font-bold ${expandView ? 'block' : 'hidden lg:block'}`}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
