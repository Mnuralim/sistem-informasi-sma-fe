'use client'
import React, { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { deleteExtracurricular } from '@/lib/extracurricular'
import { customRevalidation } from '@/actions/custom-revalidation'
import Image from 'next/image'
import AddExtracurricularModal from './add-extracuricular'
import EditExtracurricularModal from './edit-extracuricular'

interface Props {
  extracurriculars: IExtracurricular[]
  accessToken: string
}

const ExtracurricularsList = ({ extracurriculars, accessToken }: Props) => {
  const [isAddingNewExtracurricular, setIsAddingNewExtracurricular] = useState<boolean>(false)
  const [editingExtracurricularId, setEditingExtracurricularId] = useState<string | null>(null)
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null)

  const toggleAddModal = () => {
    setIsAddingNewExtracurricular(!isAddingNewExtracurricular)
  }

  const toggleEditModal = (id: string) => {
    setEditingExtracurricularId(id)
  }

  const handleDeleteExtracurricular = async (id: string) => {
    setLoadingDeleteId(id)
    try {
      const response = await deleteExtracurricular(id, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      toast.success('Ekstrakurikuler berhasil dihapus')
      customRevalidation(['/admin/main-web/extracurriculars', '/user/extracurricular'])
    } catch (error: any) {
      toast.error('Gagal menghapus ekstrakurikuler')
    } finally {
      setLoadingDeleteId(null)
    }
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Ekstrakurikuler</h1>

        <div className="flex justify-end mb-4">
          <button onClick={toggleAddModal} className="py-2 px-4 bg-orange-05 hover:bg-orange-700 text-white rounded-lg">
            Tambah Ekstrakurikuler
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
                  Nama
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
              {extracurriculars.length > 0 ? (
                extracurriculars.map((extracurricular) => (
                  <tr key={extracurricular.id} className="border-b">
                    <td className="px-6 py-4 text-sm">
                      {extracurricular.imageUrl ? (
                        <Image
                          width={100}
                          height={100}
                          src={extracurricular.imageUrl}
                          alt={extracurricular.name}
                          className="w-20 h-20 object-cover aspect-square rounded-lg"
                        />
                      ) : (
                        'Tidak ada gambar'
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#202244] font-semibold">{extracurricular.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{extracurricular.description}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleEditModal(extracurricular.id)}
                          className="py-1.5 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteExtracurricular(extracurricular.id)}
                          className={`py-1.5 px-4 bg-red-500 text-white rounded-lg ${
                            loadingDeleteId === extracurricular.id ? 'cursor-not-allowed' : 'hover:bg-red-700'
                          }`}
                          disabled={loadingDeleteId === extracurricular.id}
                        >
                          {loadingDeleteId === extracurricular.id ? (
                            <FaSpinner className="animate-spin mx-auto" />
                          ) : (
                            'Hapus'
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    Belum ada ekstrakurikuler yang ditambahkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAddingNewExtracurricular && <AddExtracurricularModal accessToken={accessToken} onClose={toggleAddModal} />}

      {editingExtracurricularId && (
        <EditExtracurricularModal
          extracurricular={extracurriculars.find((extra) => extra.id === editingExtracurricularId)!}
          accessToken={accessToken}
          onClose={() => setEditingExtracurricularId(null)}
        />
      )}
    </div>
  )
}

export default ExtracurricularsList
