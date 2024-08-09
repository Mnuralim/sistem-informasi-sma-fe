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
  setShowNavabar: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileNavbarItem = ({ title, link, subdata, handleRedirect, setShowNavabar }: MobileNavbarItemProps) => (
  <Disclosure as="div" className="py-1" defaultOpen={false} onClick={() => handleRedirect(link)}>
    <DisclosureButton className="group flex w-full items-center justify-between">
      <span className="text-sm/6 font-semibold text-black-primary">{title}</span>
      {link === null && <IoChevronDownSharp className="size-5 fill-black/60 group-open:rotate-180" />}
    </DisclosureButton>
    <DisclosurePanel className="mt-2 text-sm/5 text-black/50">
      {subdata.map((subdataItem, index) => (
        <Link
          key={index}
          className="block rounded-lg py-2 px-3 transition hover:bg-gray-100"
          href={subdataItem.link}
          onClick={() => setShowNavabar(false)}
        >
          <p className="text-black-secondary">{subdataItem.title}</p>
        </Link>
      ))}
    </DisclosurePanel>
  </Disclosure>
)

export default MobileNavbarItem
