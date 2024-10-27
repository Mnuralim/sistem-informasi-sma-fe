import { useRouter } from 'next/navigation'
import React from 'react'
import NavbarItem from './navbar-item'
import MobileNavbarItem from './mobile-navbar-item'

const datas = [
  {
    title: 'Beranda',
    subdata: [],
    link: '/user',
  },
  {
    title: 'Profile',
    subdata: [
      {
        title: 'Sejarah',
        link: '/user/history',
      },
      {
        title: 'Visi Misi',
        link: '/user#vision',
      },
      {
        title: 'Struktur Organisasi',
        link: '/user/organization',
      },
      {
        title: 'Kepala Sekolah',
        link: '/user/headmaster',
      },
      {
        title: 'Komite Sekolah',
        link: '/user/committee',
      },
    ],
    link: null,
  },
  {
    title: 'Informasi Publik',
    subdata: [
      {
        title: 'Berita',
        link: '/user/news',
      },
      {
        title: 'Foto',
        link: '/user/gallery?type=photos',
      },
      {
        title: 'Video',
        link: '/user/gallery?type=videos',
      },
      {
        title: 'Download',
        link: '/user/download',
      },
      {
        title: 'Laporan Keuangan',
        link: '/user/finance-report',
      },
    ],
    link: null,
  },
  {
    title: 'Siswa',
    subdata: [
      {
        title: 'Siswa',
        link: '/user/student',
      },
      {
        title: 'OSIS',
        link: '/user/osis',
      },
      {
        title: 'Prestasi Siswa',
        link: '/user/student-achievement',
      },
      {
        title: 'Ekstrakurikuler',
        link: '/user/extracurricular',
      },
    ],
    link: null,
  },
  {
    title: 'GTK',
    subdata: [
      {
        title: 'Daftar Guru',
        link: '/user/teacher',
      },
      {
        title: 'Daftar Staff Tata Usaha',
        link: '/user/staff',
      },
      {
        title: 'Prestasi Guru dan Karyawan',
        link: '/user/achievement',
      },
    ],
    link: null,
  },
  {
    title: 'Blog',
    subdata: [],
    link: '/user/blog',
  },
  {
    title: 'Pengumuman Kelulusan',
    subdata: [],
    link: '/',
  },
  {
    title: 'Hubungi Kami',
    subdata: [],
    link: '/user#contact',
  },
]

interface Props {
  handleCloseNavbar: () => void
}

const Navbar = ({ handleCloseNavbar }: Props) => {
  const router = useRouter()

  const handleRedirect = (path: string | null) => {
    if (typeof path === 'string') {
      router.push(path)
      handleCloseNavbar()
    }
  }

  return (
    <nav className="w-full py-1 mx-auto max-w-7xl">
      <div className="hidden lg:flex lg:flex-row items-center justify-between px-3">
        <NavbarItem data={datas} handleRedirect={handleRedirect} />
      </div>
      <div className="lg:hidden flex flex-col h-screen overflow-y-auto px-3 pb-52">
        {datas.map((data, index) => (
          <MobileNavbarItem
            key={index}
            title={data.title}
            link={data.link}
            subdata={data.subdata}
            handleRedirect={handleRedirect}
            handleCloseNavbar={handleCloseNavbar}
          />
        ))}
      </div>
    </nav>
  )
}

export default Navbar
