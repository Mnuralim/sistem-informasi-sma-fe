import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { IoChevronDownSharp } from 'react-icons/io5'
import Link from 'next/link'

interface Subdata {
  title: string
  link: string
}

interface MobileNavbarItemProps {
  title: string
  link: string | null
  subdata: Subdata[]
  handleRedirect: (path: string | null) => void
  handleCloseNavbar: () => void
}

const MobileNavbarItem = ({ title, link, subdata, handleRedirect, handleCloseNavbar }: MobileNavbarItemProps) => (
  <Disclosure as="div" className="py-1" defaultOpen={false} onClick={() => handleRedirect(link)}>
    <DisclosureButton className="group hover:text-orange-05 hover:bg-orange-05/10 py-3 px-3 flex w-full items-center justify-between rounded-md">
      <span className="text-sm font-semibold ">{title}</span>
      {link === null && <IoChevronDownSharp className="size-5 fill-black/60 group-open:rotate-180" />}
    </DisclosureButton>
    <DisclosurePanel className="mt-2 text-sm">
      {subdata.map((subdataItem, index) => (
        <Link
          key={index}
          className="block px-8 hover:text-orange-05 hover:bg-orange-05/10 rounded-md py-2  transition "
          href={subdataItem.link}
          onClick={handleCloseNavbar}
        >
          <p>{subdataItem.title}</p>
        </Link>
      ))}
    </DisclosurePanel>
  </Disclosure>
)

export default MobileNavbarItem
