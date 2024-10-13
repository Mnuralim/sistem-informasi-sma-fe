import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Link from 'next/link'
import DropdownNavbar from './dropdown-navbar'
import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

type Data =
  | {
      title: string
      subdata: never[]
      link: string
    }
  | {
      title: string
      subdata: {
        title: string
        link: string
      }[]
      link: null
    }

interface NavbarItemProps {
  data: Data[]
  handleRedirect: (path: string | null) => void
}

const NavbarItem = ({ data, handleRedirect }: NavbarItemProps) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false)
  return (
    <div className="flex justify-between items-center w-full">
      {data.map((item, index) => (
        <div key={index}>
          {item.subdata.length === 0 ? (
            <Link
              href={item.link!}
              className="font-semibold py-2 px-3 text-black-primary focus:outline-none rounded-md hover:text-orange-05 hover:bg-orange-05/10 "
            >
              {item.title}
            </Link>
          ) : (
            <DropdownNavbar isOpen={openDropdown} subData={item.subdata}>
              <button className="py-2 px-3 font-semibold text-black-primary focus:outline-none rounded-md hover:text-orange-05 hover:bg-orange-05/10 flex items-center gap-1">
                {item.title}
                <FaChevronDown className={`min-w-fit group-hover:hidden`} />
                <FaChevronUp className={`min-w-fit hidden group-hover:inline`} />
              </button>
            </DropdownNavbar>
          )}
        </div>
      ))}
    </div>
  )
}

export default NavbarItem
