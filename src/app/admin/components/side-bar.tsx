'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { IoIosArrowDown, IoMdLogOut, IoMdClose, IoMdGlobe } from 'react-icons/io'
import { FaInfoCircle, FaPhone } from 'react-icons/fa'
import { AiOutlineHome } from 'react-icons/ai'
import Image from 'next/image'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { RxHamburgerMenu } from 'react-icons/rx'
import Link from 'next/link'
import { LuFolder } from 'react-icons/lu'
import { signOut } from 'next-auth/react'

interface Props {
  profile: IProfile
}

interface SubItem {
  name: string
  path: string
  icon: React.ElementType
}

interface SidebarItem {
  name: string
  icon: React.ElementType
  subitems: SubItem[]
  path: string | null
}

const sideBarItems: SidebarItem[] = [
  {
    name: 'Beranda',
    icon: AiOutlineHome,
    subitems: [],
    path: '/admin/home',
  },
  {
    name: 'Tampilan Web Utama',
    icon: IoMdGlobe,
    subitems: [
      { name: 'Profile Sekolah', path: '/admin/main-web/profile', icon: FaInfoCircle },
      { name: 'Slider Beranda', path: '/admin/main-web/slider', icon: FaInfoCircle },
      { name: 'Berita', path: '/admin/main-web/news', icon: FaInfoCircle },
      { name: 'Sejarah', path: '/admin/main-web/history', icon: FaPhone },
      { name: 'Visi dan Misi', path: '/admin/main-web/vision-mission', icon: FaPhone },
      { name: 'Struktur Organisasi', path: '/admin/main-web/organization', icon: FaPhone },
      { name: 'Kepala Sekolah', path: '/admin/main-web/principal', icon: FaPhone },
      { name: 'Komite Sekolah', path: '/admin/main-web/school-committee', icon: FaPhone },
      { name: 'Sambutan Kepala Sekolah', path: '/admin/main-web/headmaster', icon: FaPhone },
      { name: 'Sambutan Komite Sekolah', path: '/admin/main-web/committee', icon: FaPhone },
      { name: 'Foto', path: '/admin/main-web/image', icon: FaPhone },
      { name: 'Video', path: '/admin/main-web/video', icon: FaPhone },
      { name: 'Laporan Keuangan', path: '/admin/main-web/finance-report', icon: FaPhone },
      { name: 'Ekstrakurikuler', path: '/admin/main-web/extracurriculars', icon: FaPhone },
      { name: 'Prestasi Siswa', path: '/admin/main-web/student-achievement', icon: FaPhone },
      { name: 'OSIS', path: '/admin/main-web/osis', icon: FaPhone },
      { name: 'Prestasi Guru dan Karyawan', path: '/admin/main-web/teacher-achievement', icon: FaPhone },
      { name: 'Blog', path: '/admin/main-web/blog', icon: FaPhone },
    ],
    path: null,
  },
  {
    name: 'Data',
    icon: LuFolder,
    subitems: [
      { name: 'Daftar Siswa', path: '/admin/data/students', icon: FaPhone },
      { name: 'Daftar Guru', path: '/admin/data/teacher', icon: FaPhone },
      { name: 'Daftar Staff Tata Usaha', path: '/admin/data/staff', icon: FaPhone },
    ],
    path: null,
  },
]

const isActivePath = (path: string | null, pathname: string, subitems: SubItem[] = []): boolean => {
  const normalize = (str: string | null) => (str ? str.replace(/\/+$/, '').toLowerCase() : '')
  return (
    normalize(pathname) === normalize(path) ||
    subitems.some((subitem) => normalize(pathname) === normalize(subitem.path))
  )
}

const Sidebar = ({ profile }: Props): JSX.Element | null => {
  const [expandView, setExpandView] = useState<boolean>(false)
  const pathname = usePathname()

  const handleNavigation = (): void => {
    if (window.innerWidth < 768) setExpandView(false)
  }

  if (pathname === '/admin/login') return null

  const renderSidebarItem = (item: SidebarItem): JSX.Element => {
    const isActive = isActivePath(item.path, pathname, item.subitems)
    return (
      <Disclosure key={item.name}>
        {({ open }) => (
          <>
            <DisclosureButton
              as={item.path ? Link : 'button'}
              //@ts-ignore
              href={item.path ? item.path : '#'}
              className={`flex items-center w-full hover:bg-orange-05/10 hover:text-orange-05 ${
                expandView ? 'py-3 px-3 justify-between' : 'w-fit p-3 justify-center lg:justify-between '
              } ${isActive ? 'bg-orange-05/10 text-orange-05' : ''}`}
              onClick={() => (item.path ? handleNavigation() : setExpandView(true))}
            >
              <div className="flex items-center gap-2">
                <item.icon className="text-xl md:text-2xl lg:text-3xl" />
                <p className={`text-xs md:text-sm lg:text-base font-bold ${expandView ? 'block' : 'hidden lg:block'}`}>
                  {item.name}
                </p>
              </div>
              {item.subitems.length > 0 && expandView && (
                <IoIosArrowDown
                  className={`transform transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
                  size={22}
                />
              )}
            </DisclosureButton>

            <DisclosurePanel
              transition
              className={`origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0`}
            >
              {expandView ? (
                <div className={`flex flex-col items-start mx-5 ${item.subitems.length !== 0 ? 'mt-5' : ''}`}>
                  {item.subitems.map((sub) => (
                    <Link
                      href={sub.path}
                      key={sub.name}
                      onClick={handleNavigation}
                      className={`py-2 w-full text-xs md:text-sm lg:text-base text-start rounded pl-3 hover:bg-orange-05/10 hover:text-orange-05 ${
                        isActivePath(sub.path, pathname) ? 'bg-orange-05/10 text-orange-05' : ''
                      }`}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              ) : null}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    )
  }

  return (
    <aside
      className={`fixed z-40 left-0 h-screen bg-dark-blue transition-all no-scrollbar ${
        expandView ? 'w-4/5 md:w-3/5 lg:w-1/5' : 'w-[12.666667%] lg:w-1/5'
      } overflow-y-auto`}
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
                src={profile.imageUrl ?? 'https://placehold.co/400x400/gray/white.png'}
                className="aspect-square rounded-full w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16"
              />
              <h1 className="text-xs md:text-sm lg:text-base text-orange-05 font-semibold">{profile.name}</h1>
            </div>
            <button onClick={() => setExpandView(!expandView)} className="lg:hidden text-white bg-orange-05 p-2">
              {expandView ? (
                <IoMdClose className="text-lg md:text-xl lg:text-2xl" />
              ) : (
                <RxHamburgerMenu className="text-lg md:text-xl lg:text-2xl" />
              )}
            </button>
          </div>
          <div className={`mt-10 text-white ${expandView ? '' : 'flex flex-col items-center'}`}>
            {sideBarItems.map(renderSidebarItem)}
          </div>
        </div>
        <div className="mt-10 text-white pb-24 lg:pb-16">
          <button onClick={() => signOut()} className="flex items-center gap-2 px-3">
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
