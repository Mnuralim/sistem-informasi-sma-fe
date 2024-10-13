import React from 'react'
import StaffCard from './components/staff-card'
import { getStaff } from '@/lib/staff'
import Image from 'next/image'

const Page = async () => {
  const staffs = await getStaff()
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-[#EB5437] font-semibold tracking-wide uppercase">Staff</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#202244] sm:text-4xl">
            Daftar Staff dan Tata Usaha
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
                  Posisi
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  NIP/NIP3K
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Golongan
                </th>
              </tr>
            </thead>
            <tbody>
              {staffs.map((staff, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4">
                    <Image
                      width={800}
                      height={800}
                      className="rounded-full w-20 aspect-square object-cover object-center"
                      src={staff.imageUrl}
                      alt={staff.name}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-[#202244] font-semibold">
                    {staff.name}, {staff.rank}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{staff.position}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{staff.nip ? staff.nip : '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{staff.golongan}</td>
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
