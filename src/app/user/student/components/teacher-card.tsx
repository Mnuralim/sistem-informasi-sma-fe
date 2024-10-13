import Image from 'next/image'
import React from 'react'

interface TeacherCardProps {
  photo: string
  name: string
  position: string
  subject: string
}

const TeacherCard: React.FC<TeacherCardProps> = ({ photo, name, position, subject }) => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg mb-6 transform transition-transform hover:scale-105">
      <Image
        width={500}
        height={500}
        src={photo}
        alt={name}
        className="w-32 h-32 rounded-full mb-4 object-cover mx-auto"
      />
      <div className="text-center">
        <h3 className="text-xl font-semibold text-[#202244]">{name}</h3>
        <p className="text-sm text-gray-600">{position}</p>
        <p className="mt-2 text-gray-800">Mengampu: {subject}</p>
      </div>
    </div>
  )
}

export default TeacherCard
