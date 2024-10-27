'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { customRevalidation } from '@/actions/custom-revalidation'
import AddStudent from './add-student'
import EditStudent from './edit-student'
import { deleteStudent } from '@/lib/student'

interface Props {
  students: IStudent[]
  grades: IGrade[]
  accessToken: string
}

const StudentList = ({ accessToken, students, grades }: Props) => {
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null)
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleDeleteStudent = async (id: string) => {
    setLoadingDeleteId(id)
    try {
      const response = await deleteStudent(id, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      toast.success('Data Siswa berhasil dihapus')
      customRevalidation(['/admin/data/students', '/user/student'])
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoadingDeleteId(null)
    }
  }

  const toggleEditModal = (id: string) => {
    setEditingStudentId(id)
  }

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen)
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Daftar Siswa</h1>
        <button
          onClick={toggleAddModal}
          className={`px-4 py-2 ${isAddModalOpen ? 'bg-gray-200' : 'bg-[#EB5437] text-white'} rounded-lg`}
        >
          Tambah Siswa
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
                  NISN
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Kelas
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Jenis Kelamin
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((t) => (
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
                  <td className="px-6 py-4 text-sm text-[#202244] font-semibold">{t.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{t.nisn}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{t.class.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{t.gender === 'man' ? 'Laki-laki' : 'Perempuan'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleEditModal(t.id)}
                        className="py-1.5 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(t.id)}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && <AddStudent accessToken={accessToken} onClose={toggleAddModal} grades={grades} />}

      {editingStudentId && (
        <EditStudent
          grades={grades}
          student={students.find((t) => t.id === editingStudentId)!}
          accessToken={accessToken}
          onClose={() => setEditingStudentId(null)}
        />
      )}
    </div>
  )
}

export default StudentList
