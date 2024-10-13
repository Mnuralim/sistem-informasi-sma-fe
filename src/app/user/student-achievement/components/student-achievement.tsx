import Image from 'next/image'
import React from 'react'

interface StudentAchievementProps {
  imageUrl: string
  name: string
  description: string
  grade: string
  quotes: string
}

const StudentAchievement: React.FC<StudentAchievementProps> = ({ imageUrl, name, description, grade, quotes }) => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg mb-6 flex flex-col items-center">
      <Image width={500} height={500} src={imageUrl} alt={name} className="w-32 h-32 rounded-full mb-4 object-cover" />
      <div className="text-center">
        <h3 className="text-xl font-semibold text-[#202244]">{name}</h3>
        <p className="text-sm text-gray-600">Kelas: {grade}</p>
        <p className="mt-2 text-gray-800">{description}</p>
        <blockquote className="mt-4 text-gray-500 italic">&quot;{quotes}&quot;</blockquote>
      </div>
    </div>
  )
}

export default StudentAchievement
