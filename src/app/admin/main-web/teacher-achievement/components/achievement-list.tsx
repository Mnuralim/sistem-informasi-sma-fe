'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { deleteAchievement } from '@/lib/teacher-achievement'
import { customRevalidation } from '@/actions/custom-revalidation'
import AddAchievementModal from './add-achievement'
import EditAchievementModal from './edit-achievement'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  achievements: ITeacherAchievement[]
  accessToken: string
  dataEntity: ITeacher[] | IStaff[]
}

const AchievementsList = ({ accessToken, achievements, dataEntity }: Props) => {
  const [isAddingNewAchievement, setIsAddingNewAchievement] = useState<boolean>(false)
  const [editingAchievementId, setEditingAchievementId] = useState<string | null>(null)
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const typeParam = searchParams.get('type') || ''

  const toggleAddModal = () => {
    if (typeParam) {
      replace(`/admin/main-web/teacher-achievement`, {
        scroll: false,
      })
    }
    setIsAddingNewAchievement(!isAddingNewAchievement)
  }

  const toggleEditModal = (achievement: ITeacherAchievement) => {
    if (typeParam) {
      replace(`/admin/main-web/teacher-achievement`, {
        scroll: false,
      })
    } else {
      replace(`/admin/main-web/teacher-achievement?type=${achievement.staffId ? 'staff' : 'teacher'}`, {
        scroll: false,
      })
    }

    setEditingAchievementId(achievement.id)
  }

  const handleDeleteAchievement = async (id: string) => {
    setLoadingDeleteId(id)
    try {
      const response = await deleteAchievement(id, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      toast.success('Data prestasi berhasil dihapus')
      customRevalidation('/admin/main-web/teacher-achievement')
    } catch (error: any) {
      toast.error('Gagal menghapus data prestasi')
    } finally {
      setLoadingDeleteId(null)
    }
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">
          Daftar Prestasi Guru dan Karyawan
        </h1>

        <div className="flex justify-end mb-4">
          <button onClick={toggleAddModal} className="py-2 px-4 bg-orange-05 hover:bg-orange-700 text-white rounded-lg">
            Tambah Prestasi
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
                  Jabatan
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Prestasi
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Tahun
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
                      <Image
                        src={achievement.imageUrl}
                        alt={achievement.award}
                        className="w-20 object-cover rounded-lg aspect-square object-center"
                        width={200}
                        height={200}
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-[#202244] font-semibold">
                      {achievement.staffId ? achievement.staff?.name : achievement.teacher?.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {achievement.staffId ? achievement.staff?.position : `Guru ${achievement.teacher?.subject}`}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{achievement.award}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{achievement.year}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleEditModal(achievement)}
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
        <AddAchievementModal dataEntity={dataEntity} accessToken={accessToken} onClose={toggleAddModal} />
      )}

      {editingAchievementId && (
        <EditAchievementModal
          achievement={achievements.find((ach) => ach.id === editingAchievementId)!}
          dataEntity={dataEntity}
          accessToken={accessToken}
          onClose={() => setEditingAchievementId(null)}
        />
      )}
    </div>
  )
}

export default AchievementsList
