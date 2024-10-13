import React from 'react'
import Image from 'next/image'
import { getStudents } from '@/lib/student'

const Page = async () => {
  const students = await getStudents()

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-[#EB5437] font-semibold tracking-wide uppercase">Siswa</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#202244] sm:text-4xl">
            Daftar Siswa
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
                  NISN
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Kelas
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Jenis Kelamin
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4">
                    <Image
                      width={800}
                      height={800}
                      src={student.imageUrl}
                      alt={student.name}
                      className="rounded-full w-20 aspect-square object-cover object-center"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-[#202244] font-semibold">{student.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{student.nisn}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{student.class.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {student.gender === 'man' ? 'Laki-laki' : 'Perempuan'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Page
