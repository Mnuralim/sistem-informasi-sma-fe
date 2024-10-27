'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { customRevalidation } from '@/actions/custom-revalidation'
import { deleteImageGallery } from '@/lib/image-gallery'
import AddImageModal from './add-image'
import EditImageModal from './edit-image'

interface Props {
  images: IImageGallery[]
  accessToken: string
}

const GalleryList = ({ images, accessToken }: Props) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [editingImageId, setEditingImageId] = useState<string | null>(null)
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null)

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen)
  }

  const toggleEditModal = (id: string) => {
    setEditingImageId(id)
  }

  const handleDeleteImage = async (id: string) => {
    setLoadingDeleteId(id)
    try {
      const response = await deleteImageGallery(id, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      customRevalidation(['/admin/main-web/image', '/user', '/user/gallery'])
      toast.success('Gambar berhasil dihapus')
    } catch (error) {
      toast.error('Gagal menghapus gambar')
    } finally {
      setLoadingDeleteId(null)
    }
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Galeri Gambar</h1>

        <div className="flex justify-end mb-4">
          <button onClick={toggleAddModal} className="py-2 px-4 bg-orange-05 hover:bg-orange-800 text-white rounded-lg">
            Tambah Gambar
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
                  Judul
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
              {images.length > 0 ? (
                images.map((image) => (
                  <tr key={image.id} className="border-b">
                    <td className="px-6 py-4">
                      <Image
                        width={80}
                        height={80}
                        src={image.url}
                        alt={`Image ${image.title}`}
                        className="rounded-lg object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-[#202244] font-semibold">{image.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{image.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleEditModal(image.id)}
                          className="py-1.5 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteImage(image.id)}
                          className={`py-1.5 px-4 bg-red-500 text-white rounded-lg ${
                            loadingDeleteId === image.id ? 'cursor-not-allowed' : 'hover:bg-red-700'
                          }`}
                          disabled={loadingDeleteId === image.id}
                        >
                          {loadingDeleteId === image.id ? <FaSpinner className="animate-spin mx-auto" /> : 'Hapus'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    Belum ada gambar yang ditambahkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && <AddImageModal accessToken={accessToken} onClose={toggleAddModal} />}

      {editingImageId && (
        <EditImageModal
          image={images.find((image) => image.id === editingImageId)!}
          accessToken={accessToken}
          onClose={() => setEditingImageId(null)}
        />
      )}
    </div>
  )
}

export default GalleryList
