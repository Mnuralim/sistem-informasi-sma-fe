import Image from 'next/image'
import React from 'react'

interface StudentAchievementProps {
  photo: string
  name: string
  achievement: string
  studentClass: string
  quote: string
}

const StudentAchievement: React.FC<StudentAchievementProps> = ({ photo, name, achievement, studentClass, quote }) => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg mb-6 flex flex-col items-center">
      <Image width={500} height={500} src={photo} alt={name} className="w-32 h-32 rounded-full mb-4 object-cover" />
      <div className="text-center">
        <h3 className="text-xl font-semibold text-[#202244]">{name}</h3>
        <p className="text-sm text-gray-600">Kelas: {studentClass}</p>
        <p className="mt-2 text-gray-800">{achievement}</p>
        <blockquote className="mt-4 text-gray-500 italic">&quot;{quote}&quot;</blockquote>
      </div>
    </div>
  )
}

export default StudentAchievement
