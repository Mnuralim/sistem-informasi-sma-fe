'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { customRevalidation } from '@/actions/custom-revalidation'
import { deleteTeacher } from '@/lib/teacher'
import EditTeacherModal from './edit-teacher'
import AddTeacherModal from './add-teacher'

interface Props {
  teachers: ITeacher[]
  accessToken: string
}

const TeacherList = ({ accessToken, teachers }: Props) => {
  const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null)
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleDeleteTeacher = async (id: string) => {
    setLoadingDeleteId(id)
    try {
      const response = await deleteTeacher(id, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      toast.success('Data guru berhasil dihapus')
      customRevalidation(['/admin/data/teacher', '/user/teacher'])
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoadingDeleteId(null)
    }
  }

  const toggleEditModal = (id: string) => {
    setEditingTeacherId(id)
  }

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen)
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Daftar Guru</h1>
        <button
          onClick={toggleAddModal}
          className={`px-4 py-2 ${isAddModalOpen ? 'bg-gray-200' : 'bg-[#EB5437] text-white'} rounded-lg`}
        >
          Tambah Guru
        </button>
        <div className="overflow-x-auto mt-8">
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
                  Mata Pelajaran
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Deskripsi
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) =>
                t.role.name !== 'committe' ? (
                  <tr key={t.id} className="border-b">
                    <td className="px-6 py-4">
                      <Image
                        width={800}
                        height={800}
                        src={t.imageUrl}
                        alt={t.name}
                        className="rounded-full aspect-square w-20 h-auto object-cover object-center"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-[#202244] font-semibold">
                      {t.name}, {t.rank}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{t.subject || 'Tidak Mengajar'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{t.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleEditModal(t.id)}
                          className="py-1.5 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTeacher(t.id)}
                          className={`py-1.5 px-4 bg-red-500 text-white rounded-lg ${
                            loadingDeleteId === t.id ? 'cursor-not-allowed' : 'hover:bg-red-700'
                          }`}
                          disabled={loadingDeleteId === t.id}
                        >
                          {loadingDeleteId === t.id ? <FaSpinner className="animate-spin mx-auto" /> : 'Hapus'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && <AddTeacherModal accessToken={accessToken} onClose={toggleAddModal} />}

      {editingTeacherId && (
        <EditTeacherModal
          teacher={teachers.find((t) => t.id === editingTeacherId)!}
          accessToken={accessToken}
          onClose={() => setEditingTeacherId(null)}
        />
      )}
    </div>
  )
}

export default TeacherList
