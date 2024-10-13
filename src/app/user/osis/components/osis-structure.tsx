import Image from 'next/image'
import React from 'react'

interface Props {
  osis: IOsis
}

const OsisStructure = ({ osis }: Props) => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg mb-6 flex flex-col items-center">
      <Image
        width={500}
        height={500}
        src={osis.imageUrl}
        alt={osis.position}
        className="w-32 h-32 rounded-full mb-4 object-cover"
      />
      <div className="text-center">
        <h3 className="text-xl font-semibold text-[#202244]">{osis.student.name}</h3>
        <p className="mt-2 text-gray-800">{osis.position}</p>
      </div>
    </div>
  )
}

export default OsisStructure
