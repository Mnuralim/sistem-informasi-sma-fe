import React from 'react'
import TeacherCard from './components/teacher-card'
import { getTeacher } from '@/lib/teacher'
import Image from 'next/image'

const Page = async () => {
  const teachers = await getTeacher()
  const sortedTeachers = teachers.sort((a, b) => {
    if (a.role.name === 'headmaster') return -1
    if (b.role.name === 'headmaster') return 1
    return 0
  })
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-[#EB5437] font-semibold tracking-wide uppercase">Guru</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#202244] sm:text-4xl">
            Daftar Guru
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Foto
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Nama
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Golongan
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Jabatan
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  NIP/NIP3K
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Mengajar
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTeachers.map(
                (teacher, index) =>
                  teacher.role.name !== 'committe' && (
                    <tr key={index} className="border-b">
                      <td className="px-6 py-4">
                        <Image
                          width={800}
                          height={800}
                          src={teacher.imageUrl}
                          alt={teacher.name}
                          className="rounded-full w-20 aspect-square object-cover object-center"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-[#202244] font-semibold">
                        {teacher.name}, {teacher.rank}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{teacher.golongan}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {teacher.role.name === 'headmaster' ? 'Kepala Sekolah' : 'Guru'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{teacher.nip !== '-' ? teacher.nip : 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{teacher.subject || 'Tidak Mengajar'}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Page
