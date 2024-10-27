import React from 'react'
import { FaUser } from 'react-icons/fa'
import { PiUserSwitchDuotone } from 'react-icons/pi'

const data = [
  {
    text: 'Lorem Ipsum',
    icon: <FaUser />,
    total: 20,
    bgColor: 'bg-[#73CA5C]',
  },
  {
    text: 'Lorem Ipsum',
    icon: <PiUserSwitchDuotone />,
    total: 20,
    bgColor: 'bg-[#56598E]',
  },
  {
    text: 'Lorem Ipsum',
    icon: <PiUserSwitchDuotone />,
    total: 20,
    bgColor: 'bg-[#167F71]',
  },
]

export default function CardAdmin() {
  return (
    <div className={`grid gap-4 px-4 mt-8 mb-8 md:mb-10 md:mt-8 md:px-12 md:grid-cols-2 lg:grid-cols-3 md:gap-5`}>
      {data.map((item, index) => (
        <div key={index} className={`${item.bgColor} flex items-center py-5 pl-6 pr-6 rounded-[15px]`}>
          <div className="bg-white p-2 rounded-[10px] mr-4">{item.icon}</div>
          <div className="text-white">
            <p className="text-lg lg:text-xl text-extralight">{item.total}</p>
            <p className="text-base font-bold lg:text-lg">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
