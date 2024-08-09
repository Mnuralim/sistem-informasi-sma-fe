'use client'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

interface Achievement {
  id: number
  name: string
  position: string
  award: string
  date: string
  image: File | null
  imageUrl: string | null
}

const initialAchievements: Achievement[] = [
  {
    id: 1,
    name: 'John Doe',
    position: 'Guru Matematika',
    award: 'Juara 1 Lomba Matematika',
    date: '2023-05-12',
    image: null,
    imageUrl: null,
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'Staf Administrasi',
    award: 'Penghargaan Staf Terbaik',
    date: '2023-06-15',
    image: null,
    imageUrl: null,
  },
]

const AdminManageAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements)
  const [newAchievement, setNewAchievement] = useState<{
    name: string
    position: string
    award: string
    date: string
    image: File | null
    imageUrl: string | null
  }>({ name: '', position: '', award: '', date: '', image: null, imageUrl: null })
  const [isAddingNewAchievement, setIsAddingNewAchievement] = useState<boolean>(false)
  const [editingAchievementId, setEditingAchievementId] = useState<number | null>(null)
  const [editImageUrl, setEditImageUrl] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      const imageUrl = URL.createObjectURL(file)
      if (editingAchievementId !== null) {
        setAchievements((prevAchievements) =>
          prevAchievements.map((achievement) =>
            achievement.id === editingAchievementId ? { ...achievement, image: file, imageUrl } : achievement
          )
        )
        setEditImageUrl(imageUrl)
      } else {
        setNewAchievement((prevState) => ({ ...prevState, image: file, imageUrl }))
      }
    },
    [editingAchievementId]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleAddAchievement = () => {
    if (
      newAchievement.name &&
      newAchievement.position &&
      newAchievement.award &&
      newAchievement.date &&
      newAchievement.image
    ) {
      setAchievements([
        ...achievements,
        {
          id: achievements.length + 1,
          name: newAchievement.name,
          position: newAchievement.position,
          award: newAchievement.award,
          date: newAchievement.date,
          image: newAchievement.image,
          imageUrl: newAchievement.imageUrl,
        },
      ])
      setNewAchievement({ name: '', position: '', award: '', date: '', image: null, imageUrl: null })
      setIsAddingNewAchievement(false)
    }
  }

  const handleSaveEditAchievement = () => {
    if (editingAchievementId !== null) {
      setEditingAchievementId(null)
      setEditImageUrl(null)
    }
  }

  const handleDeleteAchievement = (id: number) => {
    setAchievements(achievements.filter((achievement) => achievement.id !== id))
  }

  const handleNameChange = (id: number, name: string) => {
    setAchievements(achievements.map((achievement) => (achievement.id === id ? { ...achievement, name } : achievement)))
  }

  const handlePositionChange = (id: number, position: string) => {
    setAchievements(
      achievements.map((achievement) => (achievement.id === id ? { ...achievement, position } : achievement))
    )
  }

  const handleAwardChange = (id: number, award: string) => {
    setAchievements(
      achievements.map((achievement) => (achievement.id === id ? { ...achievement, award } : achievement))
    )
  }

  const handleDateChange = (id: number, date: string) => {
    setAchievements(achievements.map((achievement) => (achievement.id === id ? { ...achievement, date } : achievement)))
  }

  const toggleEditAchievement = (id: number) => {
    setEditingAchievementId(editingAchievementId === id ? null : id)
    const achievementToEdit = achievements.find((achievement) => achievement.id === id)
    if (achievementToEdit) {
      setEditImageUrl(achievementToEdit.imageUrl)
    }
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">
          Mengelola Prestasi Guru dan Karyawan
        </h1>
        <div className="space-y-6">
          <div className="flex justify-between">
            <button
              className={`px-4 py-2 ${isAddingNewAchievement ? 'bg-gray-200' : 'bg-[#EB5437] text-white'} rounded-lg`}
              onClick={() => setIsAddingNewAchievement(!isAddingNewAchievement)}
            >
              {isAddingNewAchievement ? 'Batal' : 'Tambah Prestasi Baru'}
            </button>
          </div>

          {isAddingNewAchievement && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-[#202244] mb-4">Tambah Prestasi Baru</h2>
              <input
                type="text"
                placeholder="Nama"
                value={newAchievement.name}
                onChange={(e) => setNewAchievement({ ...newAchievement, name: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <input
                type="text"
                placeholder="Posisi"
                value={newAchievement.position}
                onChange={(e) => setNewAchievement({ ...newAchievement, position: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <textarea
                placeholder="Prestasi"
                value={newAchievement.award}
                onChange={(e) => setNewAchievement({ ...newAchievement, award: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <input
                type="date"
                placeholder="Tanggal"
                value={newAchievement.date}
                onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                <p className="text-sm lg:text-base">Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
              </div>
              {newAchievement.imageUrl && (
                <div className="mb-4">
                  <p className="text-gray-700">Pratinjau:</p>
                  <Image
                    src={newAchievement.imageUrl}
                    alt="Pratinjau Prestasi Baru"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setIsAddingNewAchievement(false)}
                  className="px-4 py-2 text-sm lg:text-base bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddAchievement}
                  className="px-4 py-2 bg-[#EB5437] text-sm lg:text-base text-white rounded-lg hover:bg-[#c43824] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB5437]"
                >
                  Tambah Prestasi
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex flex-col md:flex-row items-center justify-between border p-4 rounded-lg"
              >
                <div className="flex-1 mr-0 lg:mr-4">
                  <input
                    type="text"
                    value={achievement.name}
                    onChange={(e) => handleNameChange(achievement.id, e.target.value)}
                    className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Nama"
                    disabled={editingAchievementId !== achievement.id}
                  />
                  <input
                    type="text"
                    value={achievement.position}
                    onChange={(e) => handlePositionChange(achievement.id, e.target.value)}
                    className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Posisi"
                    disabled={editingAchievementId !== achievement.id}
                  />
                  <textarea
                    value={achievement.award}
                    onChange={(e) => handleAwardChange(achievement.id, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Prestasi"
                    disabled={editingAchievementId !== achievement.id}
                  />
                  <input
                    type="date"
                    value={achievement.date}
                    onChange={(e) => handleDateChange(achievement.id, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    disabled={editingAchievementId !== achievement.id}
                  />
                  {editingAchievementId === achievement.id && (
                    <div
                      {...getRootProps()}
                      className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer mt-3"
                    >
                      <input {...getInputProps()} />
                      <p className="text-sm lg:text-base">
                        Seret & letakkan gambar di sini, atau klik untuk memilih file
                      </p>
                    </div>
                  )}
                  {achievement.imageUrl && (
                    <div className="mt-2">
                      <p className="text-gray-700">Pratinjau:</p>
                      <Image
                        src={
                          editingAchievementId === achievement.id && editImageUrl ? editImageUrl : achievement.imageUrl
                        }
                        alt="Pratinjau Prestasi"
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="flex lg:flex-col justify-center items-center gap-3 w-full mt-2 lg:mt-0 lg:w-20">
                  <button
                    onClick={() => {
                      if (editingAchievementId === achievement.id) {
                        handleSaveEditAchievement()
                      } else {
                        toggleEditAchievement(achievement.id)
                      }
                    }}
                    className={`w-full py-1.5 lg:py-2 ${
                      editingAchievementId === achievement.id ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'
                    } rounded-lg hover:bg-blue-700`}
                  >
                    {editingAchievementId === achievement.id ? 'Simpan' : 'Edit'}
                  </button>
                  <button
                    onClick={() => handleDeleteAchievement(achievement.id)}
                    className="w-full py-1.5 lg:py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminManageAchievements
