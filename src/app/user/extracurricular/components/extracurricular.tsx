import Image from 'next/image'
import React from 'react'

interface ExtracurricularProps {
  name: string
  description: string
  imageUrl: string
}

const Extracurricular: React.FC<ExtracurricularProps> = ({ name, description, imageUrl }) => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg mb-6 flex flex-col items-center">
      <Image width={500} height={500} src={imageUrl} alt={name} className="w-full h-48 rounded-lg mb-4 object-cover" />
      <div className="text-center">
        <h3 className="text-xl font-semibold text-[#202244]">{name}</h3>
        <p className="mt-2 text-gray-800">{description}</p>
      </div>
    </div>
  )
}

export default Extracurricular
