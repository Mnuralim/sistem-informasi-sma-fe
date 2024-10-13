'use client'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { customRevalidation } from '@/actions/custom-revalidation'
import { deleteOsis } from '@/lib/osis'
import CustomSelect from '../../../components/custom-select'
import AddOsisModal from './add-osis'
import EditOsisModal from './edit-osis'

interface Props {
  osis: IOsis[]
  accessToken: string
  students: IStudent[]
}

const OsisList = ({ accessToken, osis, students }: Props) => {
  const [isAddingNewOsis, setIsAddingNewOsis] = useState<boolean>(false)
  const [editingOsisId, setEditingOsisId] = useState<string | null>(null)
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null)

  const toggleAddModal = () => {
    setIsAddingNewOsis(!isAddingNewOsis)
  }

  const toggleEditModal = (id: string) => {
    setEditingOsisId(id)
  }

  const handleDeleteOsis = async (id: string) => {
    setLoadingDeleteId(id)
    try {
      const response = await deleteOsis(id, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      toast.success('Data OSIS berhasil dihapus')
      customRevalidation('/admin/main-web/osis')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoadingDeleteId(null)
    }
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Struktur Organisasi OSIS</h1>

        <div className="flex justify-end mb-4">
          <button onClick={toggleAddModal} className="py-2 px-4 bg-orange-05 hover:bg-orange-700 text-white rounded-lg">
            Tambah Anggota OSIS
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Gambar
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Nama Siswa
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Jabatan
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Kelas
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {osis.length > 0 ? (
                osis.map((member) => (
                  <tr key={member.id} className="border-b">
                    <td className="px-6 py-4 text-sm">
                      <Image
                        src={member.imageUrl || member.student.imageUrl}
                        alt={member.student.name}
                        className="w-20 h-20 object-cover rounded-lg"
                        width={80}
                        height={80}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-[#202244] font-semibold">{member.student.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{member.position}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{member.student.class.name}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleEditModal(member.id)}
                          className="py-1.5 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteOsis(member.id)}
                          className={`py-1.5 px-4 bg-red-500 text-white rounded-lg ${
                            loadingDeleteId === member.id ? 'cursor-not-allowed' : 'hover:bg-red-700'
                          }`}
                          disabled={loadingDeleteId === member.id}
                        >
                          {loadingDeleteId === member.id ? <FaSpinner className="animate-spin mx-auto" /> : 'Hapus'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    Belum ada anggota OSIS yang ditambahkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAddingNewOsis && <AddOsisModal students={students} accessToken={accessToken} onClose={toggleAddModal} />}

      {editingOsisId && (
        <EditOsisModal
          osis={osis.find((member) => member.id === editingOsisId)!}
          students={students}
          accessToken={accessToken}
          onClose={() => setEditingOsisId(null)}
        />
      )}
    </div>
  )
}

export default OsisList
