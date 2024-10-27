'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { customRevalidation } from '@/actions/custom-revalidation'
import AddStaffModal from './add-staff'
import EditStaffModal from './edit-staff'
import { deleteStaff } from '@/lib/staff'

interface Props {
  staffs: IStaff[]
  accessToken: string
}

const StaffList = ({ accessToken, staffs }: Props) => {
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null)
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleDeleteStaff = async (id: string) => {
    setLoadingDeleteId(id)
    try {
      const response = await deleteStaff(id, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      toast.success('Data staff berhasil dihapus')
      customRevalidation(['/admin/data/staff', '/user/staff'])
    } catch (error: any) {
      toast.error('Gagal menghapus data guru')
    } finally {
      setLoadingDeleteId(null)
    }
  }

  const toggleEditModal = (id: string) => {
    setEditingStaffId(id)
  }

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen)
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Daftar Staff Tata Usaha</h1>
        <button
          onClick={toggleAddModal}
          className={`px-4 py-2 ${isAddModalOpen ? 'bg-gray-200' : 'bg-[#EB5437] text-white'} rounded-lg`}
        >
          Tambah Staff
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
                  Posisi
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
              {staffs.map((t) => (
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
                  <td className="px-6 py-4 text-sm text-gray-500">{t.position}</td>
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
                        onClick={() => handleDeleteStaff(t.id)}
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

      {isAddModalOpen && <AddStaffModal accessToken={accessToken} onClose={toggleAddModal} />}

      {editingStaffId && (
        <EditStaffModal
          staff={staffs.find((t) => t.id === editingStaffId)!}
          accessToken={accessToken}
          onClose={() => setEditingStaffId(null)}
        />
      )}
    </div>
  )
}

export default StaffList
