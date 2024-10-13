import Link from 'next/link'
import React from 'react'

interface Props {
  children: React.ReactNode
  isOpen: boolean
  subData: {
    title: string
    link: string
  }[]
}
const DropdownNavbar = ({ children, isOpen, subData }: Props) => {
  return (
    <div className="relative group">
      {children}
      <dialog
        open
        className={`absolute hidden p-2 md:w-64 rounded-md grow shadow w-full z-40 ${
          isOpen ? '' : 'group-hover:block'
        }`}
      >
        <div className="flex flex-col">
          {subData.map((item, index) => (
            <Link key={index} href={item.link} className="p-2 rounded-md hover:text-orange-05 hover:bg-orange-05/10">
              {item.title}
            </Link>
          ))}
        </div>
      </dialog>
    </div>
  )
}

export default DropdownNavbar
