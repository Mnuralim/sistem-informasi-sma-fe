'use client'
import React, { useState } from 'react'
import { IoReorderThreeOutline } from 'react-icons/io5'
import { FaEye } from 'react-icons/fa'
import Time from './time'
import Navbar from './navbar'
import Image from 'next/image'
import { MdOutlineEmail } from 'react-icons/md'
import { BsTelephone } from 'react-icons/bs'
import { FiInstagram } from 'react-icons/fi'
import Link from 'next/link'

interface Props {
  profile: IProfile
}

const Header = ({ profile }: Props) => {
  const [showNavbar, setShowNavbar] = useState<boolean>(false)

  return (
    <header className="sticky top-0 bg-dark-blue z-[100]">
      <div className="flex justify-between items-center relative px-3 py-3 w-full mx-auto max-w-7xl">
        <div className="flex items-center">
          <button className="lg:hidden" onClick={() => setShowNavbar((prev) => !prev)}>
            <IoReorderThreeOutline color="white" size={30} />
          </button>
          <Link href={'/user'} className="hidden lg:flex items-center gap-2">
            <Image src={profile.imageUrl} alt="logo" width={56} height={56} className="w-14 h-14" />
            <div>
              <h1 className="text-lg font-bold text-white">{profile.name}</h1>
              <p className="text-white text-xs">{profile.tagline}</p>
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
          <div>
            <Time />
            <div className="flex items-center gap-2 mt-0.5">
              <FaEye color="white" size={15} />
              <p className="text-white text-xs">Dilihat: </p>
              <p className="text-white text-xs">121</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`${showNavbar ? 'block' : 'hidden lg:block'} w-full h-fit px-3 shadow-md z-[100] bg-white`}>
        <Navbar setShowNavabar={setShowNavbar} />
      </div>
    </header>
  )
}

export default Header
