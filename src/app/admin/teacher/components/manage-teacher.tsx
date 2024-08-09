'use client'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

interface Teacher {
  id: number
  name: string
  subject: string
  description: string
  image: File | null
  imageUrl: string | null
}

const initialTeachers: Teacher[] = [
  {
    id: 1,
    name: 'John Doe',
    subject: 'Matematika',
    description: 'Guru Matematika berpengalaman',
    image: null,
    imageUrl: null,
  },
  { id: 2, name: 'Jane Smith', subject: 'Fisika', description: 'Ahli dalam Fisika', image: null, imageUrl: null },
]

const ManageTeacher = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers)
  const [newTeacher, setNewTeacher] = useState<{
    name: string
    subject: string
    description: string
    image: File | null
    imageUrl: string | null
  }>({ name: '', subject: '', description: '', image: null, imageUrl: null })
  const [isAddingNewTeacher, setIsAddingNewTeacher] = useState<boolean>(false)
  const [editingTeacherId, setEditingTeacherId] = useState<number | null>(null)
  const [editImageUrl, setEditImageUrl] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      const imageUrl = URL.createObjectURL(file)
      if (editingTeacherId !== null) {
        setTeachers((prevTeachers) =>
          prevTeachers.map((teacher) =>
            teacher.id === editingTeacherId ? { ...teacher, image: file, imageUrl } : teacher
          )
        )
        setEditImageUrl(imageUrl)
      } else {
        setNewTeacher((prevState) => ({ ...prevState, image: file, imageUrl }))
      }
    },
    [editingTeacherId]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleAddTeacher = () => {
    if (newTeacher.name && newTeacher.subject && newTeacher.description && newTeacher.image) {
      setTeachers([
        ...teachers,
        {
          id: teachers.length + 1,
          name: newTeacher.name,
          subject: newTeacher.subject,
          description: newTeacher.description,
          image: newTeacher.image,
          imageUrl: newTeacher.imageUrl,
        },
      ])
      setNewTeacher({ name: '', subject: '', description: '', image: null, imageUrl: null })
      setIsAddingNewTeacher(false)
    }
  }

  const handleSaveEditTeacher = () => {
    if (editingTeacherId !== null) {
      setEditingTeacherId(null)
      setEditImageUrl(null)
    }
  }

  const handleDeleteTeacher = (id: number) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id))
  }

  const handleNameChange = (id: number, name: string) => {
    setTeachers(teachers.map((teacher) => (teacher.id === id ? { ...teacher, name } : teacher)))
  }

  const handleSubjectChange = (id: number, subject: string) => {
    setTeachers(teachers.map((teacher) => (teacher.id === id ? { ...teacher, subject } : teacher)))
  }

  const handleDescriptionChange = (id: number, description: string) => {
    setTeachers(teachers.map((teacher) => (teacher.id === id ? { ...teacher, description } : teacher)))
  }

  const toggleEditTeacher = (id: number) => {
    setEditingTeacherId(editingTeacherId === id ? null : id)
    const teacherToEdit = teachers.find((teacher) => teacher.id === id)
    if (teacherToEdit) {
      setEditImageUrl(teacherToEdit.imageUrl)
    }
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Mengelola Guru</h1>
        <div className="space-y-6">
          <div className="flex justify-between">
            <button
              className={`px-4 py-2 ${isAddingNewTeacher ? 'bg-gray-200' : 'bg-[#EB5437] text-white'} rounded-lg`}
              onClick={() => setIsAddingNewTeacher(!isAddingNewTeacher)}
            >
              {isAddingNewTeacher ? 'Batal' : 'Tambah Guru Baru'}
            </button>
          </div>

          {isAddingNewTeacher && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-[#202244] mb-4">Tambah Guru Baru</h2>
              <input
                type="text"
                placeholder="Nama"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <input
                type="text"
                placeholder="Mata Pelajaran"
                value={newTeacher.subject}
                onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <textarea
                placeholder="Deskripsi"
                value={newTeacher.description}
                onChange={(e) => setNewTeacher({ ...newTeacher, description: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                <p className="text-sm lg:text-base">Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
              </div>
              {newTeacher.imageUrl && (
                <div className="mb-4">
                  <p className="text-gray-700">Pratinjau:</p>
                  <Image
                    src={newTeacher.imageUrl}
                    alt="Pratinjau Guru Baru"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setIsAddingNewTeacher(false)}
                  className="px-4 py-2 text-sm lg:text-base bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddTeacher}
                  className="px-4 py-2 bg-[#EB5437] text-sm lg:text-base text-white rounded-lg hover:bg-[#c43824] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB5437]"
                >
                  Tambah Guru
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-4">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex flex-col md:flex-row items-center justify-between border p-4 rounded-lg"
              >
                <div className="flex-1 mr-0 lg:mr-4">
                  <input
                    type="text"
                    value={teacher.name}
                    onChange={(e) => handleNameChange(teacher.id, e.target.value)}
                    className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Nama"
                    disabled={editingTeacherId !== teacher.id}
                  />
                  <input
                    type="text"
                    value={teacher.subject}
                    onChange={(e) => handleSubjectChange(teacher.id, e.target.value)}
                    className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Mata Pelajaran"
                    disabled={editingTeacherId !== teacher.id}
                  />
                  <textarea
                    value={teacher.description}
                    onChange={(e) => handleDescriptionChange(teacher.id, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Deskripsi"
                    disabled={editingTeacherId !== teacher.id}
                  />
                  {editingTeacherId === teacher.id && (
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
                  {teacher.imageUrl && (
                    <div className="mt-2">
                      <p className="text-gray-700">Pratinjau:</p>
                      <Image
                        src={editingTeacherId === teacher.id && editImageUrl ? editImageUrl : teacher.imageUrl}
                        alt="Pratinjau Guru"
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
                      if (editingTeacherId === teacher.id) {
                        handleSaveEditTeacher()
                      } else {
                        toggleEditTeacher(teacher.id)
                      }
                    }}
                    className={`w-full py-1.5 lg:py-2 ${
                      editingTeacherId === teacher.id ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'
                    } rounded-lg hover:bg-blue-700`}
                  >
                    {editingTeacherId === teacher.id ? 'Simpan' : 'Edit'}
                  </button>
                  <button
                    onClick={() => handleDeleteTeacher(teacher.id)}
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

export default ManageTeacher
