'use client'
import React, { useState } from 'react'
import { IoReorderThreeOutline } from 'react-icons/io5'
import { FaEye } from 'react-icons/fa'
import Image from 'next/image'
import { MdOutlineEmail } from 'react-icons/md'
import { BsTelephone } from 'react-icons/bs'
import { FiInstagram } from 'react-icons/fi'
import Link from 'next/link'
import Navbar from './navbar2'

interface Props {
  profile: IProfile
}

const Header = ({ profile }: Props) => {
  const [showNavbar, setShowNavbar] = useState<boolean>(false)

  const handleToggleNavbar = () => {
    setShowNavbar((prev) => {
      const bodyClass = document.body.classList
      if (prev) {
        bodyClass.remove('overflow-hidden')
      } else {
        bodyClass.add('overflow-hidden')
      }

      return !prev
    })
  }

  const handleCloseNavbar = () => {
    setShowNavbar(false)
    document.body.classList.remove('overflow-hidden')
  }

  return (
    <header className="sticky top-0 bg-white lg:bg-dark-blue z-[100]">
      <div className="flex justify-between items-center relative px-3 py-3 w-full mx-auto max-w-7xl">
        <div className="flex items-center">
          <Link href={'/user'} className="flex items-center gap-2">
            <Image src={profile.imageUrl} alt="logo" width={56} height={56} className="w-14 h-14" />
            <div>
              <h1 className="text-lg font-bold lg:text-white">{profile.name}</h1>
              <p className="lg:text-white text-xs">{profile.tagline}</p>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <div className="items-center gap-1.5 hidden lg:flex">
            <Link href={`mailto:${profile.email}`} target="_blank">
              <MdOutlineEmail className="text-orange-500" size={25} />
            </Link>
            <Link href={`tel:${profile.mobile}`} target="_blank">
              <BsTelephone className="text-orange-500" size={18.5} />
            </Link>
            <Link href={profile.instagram} target="_blank">
              <FiInstagram className="text-orange-500" size={22} />
            </Link>
          </div>
          <div className="hidden lg:block">
            <Link
              href={'/user#contact'}
              className="flex items-center gap-1.5 bg-orange-05 text-white px-4 py-2 rounded-md hover:bg-orange-600"
            >
              <FaEye size={20} />
              <span className="text-sm">Hubungi Kami</span>
            </Link>
          </div>
        </div>
        <button className="lg:hidden" onClick={handleToggleNavbar}>
          <IoReorderThreeOutline color="black" size={30} />
        </button>
      </div>
      <div
        className={`${
          showNavbar ? 'right-0' : 'right-full lg:block'
        } fixed lg:static lg:h-fit w-full h-screen shadow-md z-[100] bg-white transition-all duration-300 ease-out`}
      >
        <Navbar handleCloseNavbar={handleCloseNavbar} />
      </div>
    </header>
  )
}

export default Header
