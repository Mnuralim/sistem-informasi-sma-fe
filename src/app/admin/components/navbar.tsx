'use client'
import React from 'react'
import { FaBox } from 'react-icons/fa6'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface Props {
  username: string
}
const Navbar = ({ username }: Props) => {
  const pathname = usePathname()
  if (pathname === '/admin/login') {
    return null
  }
  return (
    <nav className="flex items-center justify-between px-4 py-5 shadow-md bg-neutral-01 md:px-12 text-dark-blue w-full dark:bg-dark-grey-04">
      <div className="font-bold text-center text-primary-dark-blue xl:text-2xl md:text-xl ">Hi, {username}!</div>
      <div className="flex items-center justify-between lg:justify-end">
        <Link
          href={'/admin/message'}
          className="flex flex-col items-center justify-center px-1 py-1 text-2xl text-white dark:bg-orange-06 rounded-2xl md:py-3 md:px-4 bg-orange-05 hover:scale-95"
        >
          <FaBox />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
