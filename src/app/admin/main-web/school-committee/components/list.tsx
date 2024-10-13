'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaSpinner } from 'react-icons/fa'
import { deleteTeacher } from '@/lib/teacher'
import { toast } from 'react-toastify'
import AddTeacherModal from './add-committe'
import EditTeacherModal from './edit-committee'
import { customRevalidation } from '@/actions/custom-revalidation'

interface TeacherListProps {
  teacher: ITeacher
  accessToken: string
}

const TeacherList = ({ teacher, accessToken }: TeacherListProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null)
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null)

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen)
  }

  const toggleEditModal = (id: string) => {
    setEditingTeacherId(id)
  }

  const handleDeleteTeacher = async (id: string) => {
    setLoadingDeleteId(id)
    try {
      const response = await deleteTeacher(id, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      customRevalidation('/admin/main-web/school-committee')
      toast.success('Data komite sekolah berhasil dihapus')
    } catch (error) {
      toast.error('Gagal menghapus data komite sekolah')
    } finally {
      setLoadingDeleteId(null)
    }
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Komite Sekolah</h1>
        <div className="flex justify-end mb-4">
          {teacher ? null : (
            <button
              onClick={toggleAddModal}
              className="py-2 px-4 bg-orange-05 hover:bg-orange-05/90 text-white rounded-lg mb-4"
            >
              Tambah Komite Sekolah
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Foto
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Nama
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Pangkat
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Golongan
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {teacher ? (
                <tr key={teacher.id} className="border-b">
                  <td className="px-6 py-4">
                    <Image
                      width={80}
                      height={80}
                      src={teacher.imageUrl}
                      alt={teacher.name}
                      className="rounded-full aspect-square object-center object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-[#202244] font-semibold">{teacher.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{teacher.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{teacher.rank}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{teacher.golongan}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleEditModal(teacher.id)}
                        className="py-1.5 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTeacher(teacher.id)}
                        className={`py-1.5 px-4 bg-red-500 text-white rounded-lg ${
                          loadingDeleteId === teacher.id ? 'cursor-not-allowed' : 'hover:bg-red-700'
                        }`}
                        disabled={loadingDeleteId === teacher.id}
                      >
                        {loadingDeleteId === teacher.id ? <FaSpinner className="animate-spin mx-auto" /> : 'Hapus'}
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    Belum ada data komite sekolah.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && <AddTeacherModal accessToken={accessToken} onClose={toggleAddModal} />}

      {editingTeacherId && (
        <EditTeacherModal teacher={teacher} accessToken={accessToken} onClose={() => setEditingTeacherId(null)} />
      )}
    </div>
  )
}

export default TeacherList
