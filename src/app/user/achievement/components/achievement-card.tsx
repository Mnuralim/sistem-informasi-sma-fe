import Image from 'next/image'
import React from 'react'

interface AchievementCardProps {
  photo: string
  name: string
  position: string
  achievement: string
  year: string
}

const AchievementCard: React.FC<AchievementCardProps> = ({ photo, name, position, achievement, year }) => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg mb-6 flex flex-col items-center transform transition-transform hover:scale-105">
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
        <p className="mt-2 text-gray-800">Prestasi: {achievement}</p>
        <p className="text-sm text-gray-500">{year}</p>
      </div>
    </div>
  )
}

export default AchievementCard
