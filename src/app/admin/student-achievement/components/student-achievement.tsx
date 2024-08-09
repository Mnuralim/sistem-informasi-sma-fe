'use client'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

interface StudentAchievement {
  id: number
  name: string
  description: string
  quotes: string
  grade: string
  image: File | null
  imageUrl: string | null
}

const initialAchievements: StudentAchievement[] = [
  {
    id: 1,
    name: 'John Doe',
    description: 'Juara 1 Olimpiade Matematika',
    quotes: 'Belajar adalah kunci sukses',
    grade: 'XII IPA 1',
    image: null,
    imageUrl: null,
  },
  {
    id: 2,
    name: 'Jane Smith',
    description: 'Juara 2 Lomba Sains',
    quotes: 'Kerja keras tidak mengkhianati hasil',
    grade: 'XI IPS 2',
    image: null,
    imageUrl: null,
  },
]

const Achievements = () => {
  const [achievements, setAchievements] = useState<StudentAchievement[]>(initialAchievements)
  const [newAchievement, setNewAchievement] = useState<{
    name: string
    description: string
    quotes: string
    grade: string
    image: File | null
    imageUrl: string | null
  }>({ name: '', description: '', quotes: '', grade: '', image: null, imageUrl: null })
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
      newAchievement.description &&
      newAchievement.quotes &&
      newAchievement.grade &&
      newAchievement.image
    ) {
      setAchievements([
        ...achievements,
        {
          id: achievements.length + 1,
          name: newAchievement.name,
          description: newAchievement.description,
          quotes: newAchievement.quotes,
          grade: newAchievement.grade,
          image: newAchievement.image,
          imageUrl: newAchievement.imageUrl,
        },
      ])
      setNewAchievement({ name: '', description: '', quotes: '', grade: '', image: null, imageUrl: null })
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

  const handleDescriptionChange = (id: number, description: string) => {
    setAchievements(
      achievements.map((achievement) => (achievement.id === id ? { ...achievement, description } : achievement))
    )
  }

  const handleQuotesChange = (id: number, quotes: string) => {
    setAchievements(
      achievements.map((achievement) => (achievement.id === id ? { ...achievement, quotes } : achievement))
    )
  }

  const handleGradeChange = (id: number, grade: string) => {
    setAchievements(
      achievements.map((achievement) => (achievement.id === id ? { ...achievement, grade } : achievement))
    )
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
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Daftar Siswa Berprestasi</h1>
        <div className="space-y-6">
          <div className="flex justify-between">
            <button
              className={`px-4 py-2 ${isAddingNewAchievement ? 'bg-gray-200' : 'bg-[#EB5437] text-white'} rounded-lg`}
              onClick={() => setIsAddingNewAchievement(!isAddingNewAchievement)}
            >
              {isAddingNewAchievement ? 'Batal' : 'Tambah Siswa Berprestasi'}
            </button>
          </div>

          {isAddingNewAchievement && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-[#202244] mb-4">Tambah Siswa Berprestasi Baru</h2>
              <input
                type="text"
                placeholder="Nama Siswa"
                value={newAchievement.name}
                onChange={(e) => setNewAchievement({ ...newAchievement, name: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <textarea
                placeholder="Deskripsi Prestasi"
                value={newAchievement.description}
                onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <textarea
                placeholder="Quotes"
                value={newAchievement.quotes}
                onChange={(e) => setNewAchievement({ ...newAchievement, quotes: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <input
                type="text"
                placeholder="Kelas"
                value={newAchievement.grade}
                onChange={(e) => setNewAchievement({ ...newAchievement, grade: e.target.value })}
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
                  <p className="text-gray-700">Preview:</p>
                  <Image
                    src={newAchievement.imageUrl}
                    alt="Achievement Preview"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => setIsAddingNewAchievement(false)}
                  className="px-4 py-2 text-sm lg:text-base bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddAchievement}
                  className="px-4 py-2 text-sm lg:text-base bg-[#EB5437] text-white rounded-lg hover:bg-[#c43824] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB5437]"
                >
                  Tambah Siswa
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
                    placeholder="Nama Siswa"
                    disabled={editingAchievementId !== achievement.id}
                  />
                  <textarea
                    value={achievement.description}
                    onChange={(e) => handleDescriptionChange(achievement.id, e.target.value)}
                    className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Deskripsi Prestasi"
                    disabled={editingAchievementId !== achievement.id}
                  />
                  <textarea
                    value={achievement.quotes}
                    onChange={(e) => handleQuotesChange(achievement.id, e.target.value)}
                    className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Quotes"
                    disabled={editingAchievementId !== achievement.id}
                  />
                  <input
                    type="text"
                    value={achievement.grade}
                    onChange={(e) => handleGradeChange(achievement.id, e.target.value)}
                    className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Kelas"
                    disabled={editingAchievementId !== achievement.id}
                  />
                  {editingAchievementId === achievement.id && (
                    <div
                      {...getRootProps()}
                      className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer"
                    >
                      <input {...getInputProps()} />
                      <p className="text-sm lg:text-base">
                        Seret & letakkan gambar di sini, atau klik untuk memilih file
                      </p>
                    </div>
                  )}
                  {achievement.imageUrl && (
                    <div className="mt-2">
                      <p className="text-gray-700">Preview:</p>
                      <Image
                        src={
                          editingAchievementId === achievement.id && editImageUrl ? editImageUrl : achievement.imageUrl
                        }
                        alt="Achievement Preview"
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="flex lg:flex-col justify-center items-center gap-3 w-full mt-2 lg:mt-0 lg:w-20">
                  <button
                    onClick={() => toggleEditAchievement(achievement.id)}
                    className="w-full py-1.5 lg:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
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

export default Achievements
