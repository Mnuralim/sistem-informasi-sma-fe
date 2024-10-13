import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { updateImageGallery } from '@/lib/image-gallery'
import { customRevalidation } from '@/actions/custom-revalidation'
import Modal from '@/app/admin/components/modal'

interface EditImageModalProps {
  image: IImageGallery
  accessToken: string
  onClose: () => void
}

const EditImageModal = ({ image, accessToken, onClose }: EditImageModalProps) => {
  const [updateImage, setUpdateImage] = useState<{ title: string; description: string }>({
    title: image.title,
    description: image.description,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImageFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleEditImage = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('title', updateImage.title)
    formData.append('description', updateImage.description)
    if (imageFile) {
      formData.append('image', imageFile as File)
    }
    try {
      const response = await updateImageGallery(image.id, updateImage.title, updateImage.description, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      customRevalidation('/admin/main-web/image')
      toast.success('Gambar berhasil diperbarui')
      onClose()
    } catch (error) {
      toast.error('Gagal memperbarui gambar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold text-[#202244]">Edit Gambar</h2>
      <div {...getRootProps()} className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer mb-4">
        <input {...getInputProps()} />
        <p className="text-sm lg:text-base">Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
      </div>
      {imageFile ? (
        <Image
          width={500}
          height={500}
          src={URL.createObjectURL(imageFile)}
          alt="Image Preview"
          className="object-cover rounded-lg mb-4"
        />
      ) : (
        <Image width={500} height={500} src={image.url} alt={image.title} className="object-cover rounded-lg mb-4" />
      )}
      <input
        type="text"
        placeholder="Judul Gambar"
        value={updateImage.title}
        onChange={(e) => setUpdateImage({ ...updateImage, title: e.target.value })}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
      />
      <textarea
        placeholder="Deskripsi Gambar"
        value={updateImage.description}
        onChange={(e) => setUpdateImage({ ...updateImage, description: e.target.value })}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
      />
      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-700">
          Batal
        </button>
        <button
          onClick={handleEditImage}
          disabled={loading}
          className="py-2 px-4 bg-[#EB5437] text-white rounded-lg hover:bg-[#c43824]"
        >
          {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Simpan'}
        </button>
      </div>
    </Modal>
  )
}

export default EditImageModal
