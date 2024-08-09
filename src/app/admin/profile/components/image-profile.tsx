'use client'
import { customRevalidation } from '@/actions/custom-revalidation'
import { updateImageProfile } from '@/lib/profile'
import Image from 'next/image'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'

interface Props {
  url: string
  accessToken: string
}

const ImageProfile = ({ url, accessToken }: Props) => {
  const [image, setImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>(url)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const url = URL.createObjectURL(file)
    setImage(file)
    setImageUrl(url)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleCancel = () => {
    setImage(null)
    setImageUrl(url)
  }

  const handleSave = async () => {
    setIsSubmitting(true)

    if (!image) {
      setIsSubmitting(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append('image', image)
      const response = await updateImageProfile(formData, accessToken)

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Network response was not ok')
      }

      customRevalidation('/admin/profile')
      toast.success(data.message)
    } catch (error: any) {
      toast.error(error.message || 'Terjadi kesalahan yang tidak terduga')
    } finally {
      setIsSubmitting(false)
      setImage(null)
    }
  }

  return (
    <div className="w-full p-5 bg-white rounded-lg shadow-lg">
      <div {...getRootProps()} className="cursor-pointer">
        <input {...getInputProps()} />
        <Image
          src={imageUrl}
          alt="avatar"
          height={1000}
          width={1000}
          className="w-full h-full object-cover rounded-lg"
        />
        <p className="text-center text-gray-500 mt-2 text-sm lg:text-base">
          Klik atau drag & drop untuk mengubah gambar
        </p>
      </div>
      {image && (
        <div className="mt-4 flex gap-3 justify-end">
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? <FaSpinner className="w-5 h-5 mx-auto animate-spin" /> : 'Simpan'}
          </button>
          <button onClick={handleCancel} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700">
            Batal
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageProfile
