'use client'
import Image from 'next/image'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface ImageType {
  id: number
  url: string
  title: string
  description: string
}

const initialImages: ImageType[] = [
  { id: 1, url: '/img/misi.png', title: 'Sample Image 1', description: 'Deskripsi untuk Sample Image 1' },
  { id: 2, url: '/img/misi.png', title: 'Sample Image 2', description: 'Deskripsi untuk Sample Image 2' },
]

const Gallery = () => {
  const [images, setImages] = useState<ImageType[]>(initialImages)
  const [newImage, setNewImage] = useState<{ url: string; title: string; description: string }>({
    url: '',
    title: '',
    description: '',
  })
  const [isAddingNewImage, setIsAddingNewImage] = useState<boolean>(false)
  const [editingImageId, setEditingImageId] = useState<number | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImageUrl = URL.createObjectURL(acceptedFiles[0])
    setNewImage({ url: newImageUrl, title: '', description: '' })
    setIsAddingNewImage(true)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleAddImage = () => {
    if (newImage.title && newImage.description && newImage.url) {
      setImages([
        ...images,
        { id: images.length + 1, url: newImage.url, title: newImage.title, description: newImage.description },
      ])
      setNewImage({ url: '', title: '', description: '' })
      setIsAddingNewImage(false)
    }
  }

  const handleSaveEditImage = () => {
    if (newImage.title && newImage.description && newImage.url && editingImageId !== null) {
      setImages(
        images.map((image) =>
          image.id === editingImageId
            ? { ...image, url: newImage.url, title: newImage.title, description: newImage.description }
            : image
        )
      )
      setNewImage({ url: '', title: '', description: '' })
      setIsAddingNewImage(false)
      setEditingImageId(null)
    }
  }

  const handleDeleteImage = (id: number) => {
    setImages(images.filter((image) => image.id !== id))
  }

  const handleTitleChange = (id: number, title: string) => {
    setImages(images.map((image) => (image.id === id ? { ...image, title } : image)))
  }

  const handleDescriptionChange = (id: number, description: string) => {
    setImages(images.map((image) => (image.id === id ? { ...image, description } : image)))
  }

  const toggleEditImage = (id: number) => {
    setEditingImageId(editingImageId === id ? null : id)
  }

  const handleFileChange = (file: File | null) => {
    const fileURL = file ? URL.createObjectURL(file) : ''
    setNewImage({ ...newImage, url: fileURL })
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Galeri Gambar</h1>
        <div className="space-y-6">
          <div className="flex justify-between">
            <button
              className={`px-4 py-2 ${isAddingNewImage ? 'bg-gray-200' : 'bg-[#EB5437] text-white'} rounded-lg`}
              onClick={() => setIsAddingNewImage(!isAddingNewImage)}
            >
              {isAddingNewImage ? 'Batal' : 'Tambah Gambar'}
            </button>
          </div>

          {isAddingNewImage && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-[#202244] mb-4">
                {editingImageId ? 'Edit Gambar' : 'Tambah Gambar Baru'}
              </h2>
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer mb-4"
              >
                <input
                  {...getInputProps()}
                  onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                />
                <p className="text-sm lg:text-base">Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
              </div>
              {newImage.url && (
                <Image
                  width={1000}
                  height={1000}
                  src={newImage.url}
                  alt="New Image"
                  className="object-cover rounded-lg mb-4 object-center"
                />
              )}
              <input
                type="text"
                placeholder="Judul Gambar"
                value={newImage.title}
                onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <textarea
                placeholder="Deskripsi Gambar"
                value={newImage.description}
                onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => setIsAddingNewImage(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={editingImageId ? handleSaveEditImage : handleAddImage}
                  className="px-4 py-2 bg-[#EB5437] text-white rounded-lg hover:bg-[#c43824] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB5437]"
                >
                  {editingImageId ? 'Simpan' : 'Tambah'}
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="flex flex-col md:flex-row items-center justify-between border p-4 rounded-lg"
              >
                <Image
                  width={500}
                  height={500}
                  src={image.url}
                  alt={`Image ${image.id}`}
                  className="w-20 h-20 lg:w-32 lg:h-32 object-cover rounded-lg mb-4 md:mb-0"
                />
                <div className="flex-1 mx-0 lg:mx-4">
                  <input
                    type="text"
                    value={image.title}
                    onChange={(e) => handleTitleChange(image.id, e.target.value)}
                    className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Judul Gambar"
                    disabled={editingImageId !== image.id}
                  />
                  <textarea
                    value={image.description}
                    onChange={(e) => handleDescriptionChange(image.id, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Deskripsi Gambar"
                    disabled={editingImageId !== image.id}
                  />
                </div>
                <div className="flex lg:flex-col justify-center items-center gap-3 w-full mt-2 lg:mt-0 lg:w-20">
                  <button
                    onClick={() => toggleEditImage(image.id)}
                    className={`w-full py-1.5 lg:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 ${
                      editingImageId === image.id ? 'bg-green-500 hover:bg-green-700' : 'bg-blue-500 hover:bg-blue-700'
                    } text-white rounded-lg`}
                  >
                    {editingImageId === image.id ? 'Simpan' : 'Edit'}
                  </button>
                  <button
                    onClick={() => handleDeleteImage(image.id)}
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

export default Gallery
