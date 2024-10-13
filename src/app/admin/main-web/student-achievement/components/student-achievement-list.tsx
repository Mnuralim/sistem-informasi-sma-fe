'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { deleteStudentAchievement } from '@/lib/student-achievement'
import { customRevalidation } from '@/actions/custom-revalidation'
import AddStudentAchievementModal from './add-achievement'
import EditStudentAchievementModal from './edit-achievement'

interface Props {
  achievements: IStudentAchievement[]
  students: IStudent[]
  accessToken: string
}

const AchievementsList = ({ accessToken, achievements, students }: Props) => {
  const [isAddingNewAchievement, setIsAddingNewAchievement] = useState<boolean>(false)
  const [editingAchievementId, setEditingAchievementId] = useState<string | null>(null)
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null)

  const toggleAddModal = () => {
    setIsAddingNewAchievement(!isAddingNewAchievement)
  }

  const toggleEditModal = (id: string) => {
    setEditingAchievementId(id)
  }

  const handleDeleteAchievement = async (id: string) => {
    setLoadingDeleteId(id)
    try {
      const response = await deleteStudentAchievement(id, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      toast.success('Prestasi siswa berhasil dihapus')
      customRevalidation('/admin/main-web/student-achievements')
    } catch (error: any) {
      toast.error('Prestasi siswa gagal dihapus')
    } finally {
      setLoadingDeleteId(null)
    }
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Daftar Prestasi Siswa</h1>

        <div className="flex justify-end mb-4">
          <button onClick={toggleAddModal} className="py-2 px-4 bg-orange-05 hover:bg-orange-700 text-white rounded-lg">
            Tambah Prestasi Siswa
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
                  Deskripsi
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Quotes
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {achievements.length > 0 ? (
                achievements.map((achievement) => (
                  <tr key={achievement.id} className="border-b">
                    <td className="px-6 py-4 text-sm">
                      {achievement.imageUrl ? (
                        <Image
                          width={100}
                          height={100}
                          src={achievement.imageUrl}
                          alt={achievement.student.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      ) : (
                        'Tidak ada gambar'
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#202244] font-semibold">{achievement.student.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{achievement.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{achievement.quotes}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleEditModal(achievement.id)}
                          className="py-1.5 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAchievement(achievement.id)}
                          className={`py-1.5 px-4 bg-red-500 text-white rounded-lg ${
                            loadingDeleteId === achievement.id ? 'cursor-not-allowed' : 'hover:bg-red-700'
                          }`}
                          disabled={loadingDeleteId === achievement.id}
                        >
                          {loadingDeleteId === achievement.id ? (
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
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Belum ada prestasi yang ditambahkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAddingNewAchievement && (
        <AddStudentAchievementModal students={students} accessToken={accessToken} onClose={toggleAddModal} />
      )}

      {editingAchievementId && (
        <EditStudentAchievementModal
          achievement={achievements.find((achievement) => achievement.id === editingAchievementId)!}
          students={students}
          accessToken={accessToken}
          onClose={() => setEditingAchievementId(null)}
        />
      )}
    </div>
  )
}

export default AchievementsList
