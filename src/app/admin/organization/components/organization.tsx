'use client'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const initialStructure = { id: 1, image: 'https://via.placeholder.com/800x400?text=Struktur+Organisasi' }

const Organization = () => {
  const [structure, setStructure] = useState(initialStructure)
  const [newImage, setNewImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isAddingNewImage, setIsAddingNewImage] = useState<boolean>(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setNewImage(file)
    setImagePreview(URL.createObjectURL(file))
    setIsAddingNewImage(true)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleAddImage = () => {
    if (!newImage) return

    const newStructure = {
      id: structure.id,
      image: URL.createObjectURL(newImage),
    }

    setStructure(newStructure)
    setNewImage(null)
    setImagePreview(null)
    setIsAddingNewImage(false)
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Struktur Organisasi</h1>
        <div className="space-y-6">
          <div className="flex justify-between gap-2">
            <button
              className={`px-4 py-2 text-sm lg:text-base ${
                !isAddingNewImage ? 'bg-[#EB5437] text-white' : 'bg-gray-200'
              } rounded-lg`}
              onClick={() => {
                setNewImage(null)
                setImagePreview(null)
                setIsAddingNewImage(false)
              }}
            >
              Unggah Gambar
            </button>
          </div>

          {!isAddingNewImage && (
            <div {...getRootProps()} className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer">
              <input {...getInputProps()} />
              <p className="text-sm lg:text-base">Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
            </div>
          )}

          {isAddingNewImage && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-[#202244] mb-4">Tambah Gambar Baru</h2>
              {imagePreview && (
                <img src={imagePreview} alt="Preview Gambar" className="w-full object-cover rounded-lg mb-4" />
              )}
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => setIsAddingNewImage(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddImage}
                  className="px-4 py-2 bg-[#EB5437] text-white rounded-lg hover:bg-[#c43824] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB5437]"
                >
                  Simpan
                </button>
              </div>
            </div>
          )}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#202244] mb-4">Pratinjau Struktur Organisasi</h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <img src={structure.image} alt="Struktur Organisasi" className="w-full h-auto object-cover rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Organization
