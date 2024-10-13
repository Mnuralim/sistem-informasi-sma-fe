import Image from 'next/image'
import React from 'react'

interface Props {
  photo: string
  name: string
  position: string
  description: string
}

const StaffCard = ({ photo, name, position, description }: Props) => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg mb-6 transform transition-transform hover:scale-105">
      <Image
        width={500}
        height={500}
        src={photo}
        alt={position}
        className="w-32 h-32 rounded-full mb-4 object-cover mx-auto"
      />
      <div className="text-center">
        <h3 className="text-xl font-semibold text-[#202244]">{name}</h3>
        <p className="text-sm text-gray-600">{position}</p>
        <p className="mt-2 text-gray-800">{description}</p>
      </div>
    </div>
  )
}

export default StaffCard
