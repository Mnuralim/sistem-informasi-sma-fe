import React, { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { createBlog } from '@/lib/blog'
import { customRevalidation } from '@/actions/custom-revalidation'
import 'react-quill/dist/quill.snow.css'
import Modal from '@/app/admin/components/modal'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface Props {
  accessToken: string
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddBlogModal = ({ accessToken, setIsModalOpen, isModalOpen }: Props) => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImageFile(file)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleAddBlog = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)

    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      const response = await createBlog(formData, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      customRevalidation('/admin/main-web/blog')
      toast.success('Blog berhasil ditambahkan')
      setTitle('')
      setContent('')
      setImageFile(null)
      setIsModalOpen(false)
    } catch (error) {
      toast.error('Blog gagal ditambahkan')
    } finally {
      setLoading(false)
    }
  }

  if (!isModalOpen) {
    return null
  }

  return (
    <Modal onClose={() => setIsModalOpen(false)}>
      <h2 className="text-2xl font-bold text-[#202244] mb-4">Tambah Blog Baru</h2>
      <input
        type="text"
        placeholder="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
      />
      <ReactQuill
        value={content}
        onChange={(value) => setContent(value)}
        className="w-full mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
      />
      <div {...getRootProps()} className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer mb-4">
        <input {...getInputProps()} />
        <p>Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
      </div>
      {imageFile && (
        <div className="mb-4">
          <p className="text-gray-700">Pratinjau:</p>
          <Image
            src={URL.createObjectURL(imageFile)}
            alt="Pratinjau Blog Baru"
            width={128}
            height={128}
            className="object-cover"
          />
        </div>
      )}
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 text-sm lg:text-base bg-gray-500 text-white rounded-lg hover:bg-gray-700"
        >
          Batal
        </button>
        <button
          onClick={handleAddBlog}
          disabled={loading}
          className="px-4 py-2 bg-[#EB5437] text-sm lg:text-base text-white rounded-lg hover:bg-[#c43824] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB5437]"
        >
          {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Tambah Blog'}
        </button>
      </div>
    </Modal>
  )
}

export default AddBlogModal
