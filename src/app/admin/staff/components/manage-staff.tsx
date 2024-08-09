'use client'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

interface Staff {
  id: number
  name: string
  position: string
  description: string
  image: File | null
  imageUrl: string | null
}

const initialStaff: Staff[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    position: 'Administrasi',
    description: 'Bertanggung jawab atas administrasi sekolah',
    image: null,
    imageUrl: null,
  },
  {
    id: 2,
    name: 'Bob Williams',
    position: 'Keamanan',
    description: 'Bertanggung jawab atas keamanan sekolah',
    image: null,
    imageUrl: null,
  },
]

const ManageStaff = () => {
  const [staff, setStaff] = useState<Staff[]>(initialStaff)
  const [newStaff, setNewStaff] = useState<{
    name: string
    position: string
    description: string
    image: File | null
    imageUrl: string | null
  }>({ name: '', position: '', description: '', image: null, imageUrl: null })
  const [isAddingNewStaff, setIsAddingNewStaff] = useState<boolean>(false)
  const [editingStaffId, setEditingStaffId] = useState<number | null>(null)
  const [editImageUrl, setEditImageUrl] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      const imageUrl = URL.createObjectURL(file)
      if (editingStaffId !== null) {
        setStaff((prevStaff) => prevStaff.map((s) => (s.id === editingStaffId ? { ...s, image: file, imageUrl } : s)))
        setEditImageUrl(imageUrl)
      } else {
        setNewStaff((prevState) => ({ ...prevState, image: file, imageUrl }))
      }
    },
    [editingStaffId]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleAddStaff = () => {
    if (newStaff.name && newStaff.position && newStaff.description && newStaff.image) {
      setStaff([
        ...staff,
        {
          id: staff.length + 1,
          name: newStaff.name,
          position: newStaff.position,
          description: newStaff.description,
          image: newStaff.image,
          imageUrl: newStaff.imageUrl,
        },
      ])
      setNewStaff({ name: '', position: '', description: '', image: null, imageUrl: null })
      setIsAddingNewStaff(false)
    }
  }

  const handleSaveEditStaff = () => {
    if (editingStaffId !== null) {
      setEditingStaffId(null)
      setEditImageUrl(null)
    }
  }

  const handleDeleteStaff = (id: number) => {
    setStaff(staff.filter((s) => s.id !== id))
  }

  const handleNameChange = (id: number, name: string) => {
    setStaff(staff.map((s) => (s.id === id ? { ...s, name } : s)))
  }

  const handlePositionChange = (id: number, position: string) => {
    setStaff(staff.map((s) => (s.id === id ? { ...s, position } : s)))
  }

  const handleDescriptionChange = (id: number, description: string) => {
    setStaff(staff.map((s) => (s.id === id ? { ...s, description } : s)))
  }

  const toggleEditStaff = (id: number) => {
    setEditingStaffId(editingStaffId === id ? null : id)
    const staffToEdit = staff.find((s) => s.id === id)
    if (staffToEdit) {
      setEditImageUrl(staffToEdit.imageUrl)
    }
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Mengelola Staff</h1>
        <div className="space-y-6">
          <div className="flex justify-between">
            <button
              className={`px-4 py-2 ${isAddingNewStaff ? 'bg-gray-200' : 'bg-[#EB5437] text-white'} rounded-lg`}
              onClick={() => setIsAddingNewStaff(!isAddingNewStaff)}
            >
              {isAddingNewStaff ? 'Batal' : 'Tambah Staff Baru'}
            </button>
          </div>

          {isAddingNewStaff && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-[#202244] mb-4">Tambah Staff Baru</h2>
              <input
                type="text"
                placeholder="Nama"
                value={newStaff.name}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <input
                type="text"
                placeholder="Posisi"
                value={newStaff.position}
                onChange={(e) => setNewStaff({ ...newStaff, position: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <textarea
                placeholder="Deskripsi"
                value={newStaff.description}
                onChange={(e) => setNewStaff({ ...newStaff, description: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                <p className="text-sm lg:text-base">Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
              </div>
              {newStaff.imageUrl && (
                <div className="mb-4">
                  <p className="text-gray-700">Pratinjau:</p>
                  <Image
                    src={newStaff.imageUrl}
                    alt="Pratinjau Staff Baru"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setIsAddingNewStaff(false)}
                  className="px-4 py-2 text-sm lg:text-base bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddStaff}
                  className="px-4 py-2 bg-[#EB5437] text-sm lg:text-base text-white rounded-lg hover:bg-[#c43824] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB5437]"
                >
                  Tambah Staff
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-4">
            {staff.map((s) => (
              <div key={s.id} className="flex flex-col md:flex-row items-center justify-between border p-4 rounded-lg">
                <div className="flex-1 mr-0 lg:mr-4">
                  <input
                    type="text"
                    value={s.name}
                    onChange={(e) => handleNameChange(s.id, e.target.value)}
                    className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Nama"
                    disabled={editingStaffId !== s.id}
                  />
                  <input
                    type="text"
                    value={s.position}
                    onChange={(e) => handlePositionChange(s.id, e.target.value)}
                    className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Posisi"
                    disabled={editingStaffId !== s.id}
                  />
                  <textarea
                    value={s.description}
                    onChange={(e) => handleDescriptionChange(s.id, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Deskripsi"
                    disabled={editingStaffId !== s.id}
                  />
                  {editingStaffId === s.id && (
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
                  {s.imageUrl && (
                    <div className="mt-2">
                      <p className="text-gray-700">Pratinjau:</p>
                      <Image
                        src={editingStaffId === s.id && editImageUrl ? editImageUrl : s.imageUrl}
                        alt="Pratinjau Staff"
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
                      if (editingStaffId === s.id) {
                        handleSaveEditStaff()
                      } else {
                        toggleEditStaff(s.id)
                      }
                    }}
                    className={`w-full py-1.5 lg:py-2 ${
                      editingStaffId === s.id ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'
                    } rounded-lg hover:bg-blue-700`}
                  >
                    {editingStaffId === s.id ? 'Simpan' : 'Edit'}
                  </button>
                  <button
                    onClick={() => handleDeleteStaff(s.id)}
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

export default ManageStaff
