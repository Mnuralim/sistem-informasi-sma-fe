import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Link from 'next/link'

interface Subdata {
  title: string
  link: string
}

interface NavbarItemProps {
  title: string
  link: string | null
  subdata: Subdata[]
  handleRedirect: (path: string | null) => void
}

const NavbarItem = ({ title, link, subdata, handleRedirect }: NavbarItemProps) => (
  <Popover>
    {({ close }) => (
      <>
        <PopoverButton
          onClick={() => handleRedirect(link)}
          className="block text-sm/6 font-semibold text-black-primary focus:outline-none"
        >
          {title}
        </PopoverButton>
        {subdata.length > 0 && (
          <PopoverPanel
            transition
            anchor="bottom"
            className="divide-y z-[100] divide-white/5 rounded-xl bg-white shadow text-sm/6 transition duration-200 ease-in-out"
          >
            <div className="p-3">
              {subdata.map((subdataItem, index) => (
                <Link
                  key={index}
                  className="block rounded-lg py-2 px-3 transition hover:bg-gray-100"
                  href={subdataItem.link}
                  onClick={close}
                >
                  <p className="font-semibold text-black-secondary">{subdataItem.title}</p>
                </Link>
              ))}
            </div>
          </PopoverPanel>
        )}
      </>
    )}
  </Popover>
)

export default NavbarItem
