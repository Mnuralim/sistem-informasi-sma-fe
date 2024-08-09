'use client'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

interface Extracurricular {
  id: number
  name: string
  description: string
  image: File | null
  imageUrl: string | null
}

const initialExtracurriculars: Extracurricular[] = [
  { id: 1, name: 'Basketball', description: 'Basketball team', image: null, imageUrl: null },
  { id: 2, name: 'Music Club', description: 'Music club', image: null, imageUrl: null },
]

const Extracurriculars = () => {
  const [extracurriculars, setExtracurriculars] = useState<Extracurricular[]>(initialExtracurriculars)
  const [newExtracurricular, setNewExtracurricular] = useState<{
    name: string
    description: string
    image: File | null
    imageUrl: string | null
  }>({ name: '', description: '', image: null, imageUrl: null })
  const [isAddingNewExtracurricular, setIsAddingNewExtracurricular] = useState<boolean>(false)
  const [editingExtracurricularId, setEditingExtracurricularId] = useState<number | null>(null)
  const [editImageUrl, setEditImageUrl] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      const imageUrl = URL.createObjectURL(file)
      if (editingExtracurricularId !== null) {
        setExtracurriculars((prevExtracurriculars) =>
          prevExtracurriculars.map((extracurricular) =>
            extracurricular.id === editingExtracurricularId
              ? { ...extracurricular, image: file, imageUrl }
              : extracurricular
          )
        )
        setEditImageUrl(imageUrl)
      } else {
        setNewExtracurricular((prevState) => ({ ...prevState, image: file, imageUrl }))
      }
    },
    [editingExtracurricularId]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleAddExtracurricular = () => {
    if (newExtracurricular.name && newExtracurricular.description && newExtracurricular.image) {
      setExtracurriculars([
        ...extracurriculars,
        {
          id: extracurriculars.length + 1,
          name: newExtracurricular.name,
          description: newExtracurricular.description,
          image: newExtracurricular.image,
          imageUrl: newExtracurricular.imageUrl,
        },
      ])
      setNewExtracurricular({ name: '', description: '', image: null, imageUrl: null })
      setIsAddingNewExtracurricular(false)
    }
  }

  const handleSaveEditExtracurricular = () => {
    if (editingExtracurricularId !== null) {
      setEditingExtracurricularId(null)
      setEditImageUrl(null)
    }
  }

  const handleDeleteExtracurricular = (id: number) => {
    setExtracurriculars(extracurriculars.filter((extracurricular) => extracurricular.id !== id))
  }

  const handleNameChange = (id: number, name: string) => {
    setExtracurriculars(
      extracurriculars.map((extracurricular) =>
        extracurricular.id === id ? { ...extracurricular, name } : extracurricular
      )
    )
  }

  const handleDescriptionChange = (id: number, description: string) => {
    setExtracurriculars(
      extracurriculars.map((extracurricular) =>
        extracurricular.id === id ? { ...extracurricular, description } : extracurricular
      )
    )
  }

  const toggleEditExtracurricular = (id: number) => {
    setEditingExtracurricularId(editingExtracurricularId === id ? null : id)
    const extracurricularToEdit = extracurriculars.find((extracurricular) => extracurricular.id === id)
    if (extracurricularToEdit) {
      setEditImageUrl(extracurricularToEdit.imageUrl)
    }
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Ekstrakurikuler</h1>
        <div className="space-y-6">
          <div className="flex justify-between">
            <button
              className={`px-4 py-2 ${
                isAddingNewExtracurricular ? 'bg-gray-200' : 'bg-[#EB5437] text-white'
              } rounded-lg`}
              onClick={() => setIsAddingNewExtracurricular(!isAddingNewExtracurricular)}
            >
              {isAddingNewExtracurricular ? 'Batal' : 'Tambah Ekstrakurikuler'}
            </button>
          </div>

          {isAddingNewExtracurricular && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-[#202244] mb-4">Tambah Ekstrakurikuler Baru</h2>
              <input
                type="text"
                placeholder="Nama Ekstrakurikuler"
                value={newExtracurricular.name}
                onChange={(e) => setNewExtracurricular({ ...newExtracurricular, name: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <textarea
                placeholder="Deskripsi Ekstrakurikuler"
                value={newExtracurricular.description}
                onChange={(e) => setNewExtracurricular({ ...newExtracurricular, description: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                <p className="text-sm lg:text-base">Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
              </div>
              {newExtracurricular.imageUrl && (
                <div className="mb-4">
                  <p className="text-gray-700">Preview:</p>
                  <Image
                    src={newExtracurricular.imageUrl}
                    alt="Extracurricular Preview"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setIsAddingNewExtracurricular(false)}
                  className="px-4 text-sm lg:text-base py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddExtracurricular}
                  className="px-4 text-sm lg:text-base py-2 bg-[#EB5437] text-white rounded-lg hover:bg-[#c43824] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB5437]"
                >
                  Tambah Ekstrakurikuler
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-4">
            {extracurriculars.map((extracurricular) => (
              <div
                key={extracurricular.id}
                className="flex flex-col md:flex-row items-center justify-between border p-4 rounded-lg"
              >
                <div className="flex-1 mr-0 lg:mr-4">
                  <input
                    type="text"
                    value={extracurricular.name}
                    onChange={(e) => handleNameChange(extracurricular.id, e.target.value)}
                    className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Nama Ekstrakurikuler"
                    disabled={editingExtracurricularId !== extracurricular.id}
                  />
                  <textarea
                    value={extracurricular.description}
                    onChange={(e) => handleDescriptionChange(extracurricular.id, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Deskripsi Ekstrakurikuler"
                    disabled={editingExtracurricularId !== extracurricular.id}
                  />
                  {editingExtracurricularId === extracurricular.id && (
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
                  {extracurricular.imageUrl && (
                    <div className="mt-2">
                      <p className="text-gray-700">Preview:</p>
                      <Image
                        src={
                          editingExtracurricularId === extracurricular.id && editImageUrl
                            ? editImageUrl
                            : extracurricular.imageUrl
                        }
                        alt="Extracurricular Preview"
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="flex lg:flex-col justify-center items-center gap-3 w-full mt-2 lg:mt-0 lg:w-20">
                  <button
                    onClick={() => toggleEditExtracurricular(extracurricular.id)}
                    className="w-full py-1.5 lg:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingExtracurricularId === extracurricular.id ? 'Simpan' : 'Edit'}
                  </button>
                  <button
                    onClick={() => handleDeleteExtracurricular(extracurricular.id)}
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

export default Extracurriculars
