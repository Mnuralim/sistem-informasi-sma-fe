import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaSpinner } from 'react-icons/fa'
import { MdCloudUpload } from 'react-icons/md'
import { toast } from 'react-toastify'
import { createExtracurricular } from '@/lib/extracurricular'
import { customRevalidation } from '@/actions/custom-revalidation'
import Image from 'next/image'
import Modal from '@/app/admin/components/modal'

interface AddExtracurricularModalProps {
  accessToken: string
  onClose: () => void
}

const AddExtracurricularModal = ({ accessToken, onClose }: AddExtracurricularModalProps) => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImageFile(file)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleAddExtracurricular = async () => {
    if (name && description) {
      setLoading(true)
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      if (imageFile) {
        formData.append('image', imageFile)
      }

      try {
        const response = await createExtracurricular(formData, accessToken)
        const resJson = await response.json()
        if (!response.ok) {
          throw new Error(resJson.message)
        }

        customRevalidation(['/admin/main-web/extracurriculars', '/user/extracurricular'])
        toast.success('Ekstrakurikuler berhasil ditambahkan')
        onClose()
      } catch (error) {
        toast.error('Gagal menambahkan ekstrakurikuler')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold text-[#202244]">Tambah Ekstrakurikuler Baru</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Nama Ekstrakurikuler"
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Deskripsi Ekstrakurikuler"
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
      />
      <div {...getRootProps()} className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer mb-4">
        <input {...getInputProps()} />
        <MdCloudUpload size={50} className="mx-auto text-[#EB5437]" />
        <p className="text-gray-600 mt-2">Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
      </div>
      {imageFile && (
        <div className="mb-4">
          <p className="text-gray-700">Preview Gambar:</p>
          <Image
            width={100}
            height={100}
            src={URL.createObjectURL(imageFile)}
            alt="Extracurricular Preview"
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-700">
          Batal
        </button>
        <button
          onClick={handleAddExtracurricular}
          disabled={loading}
          className="py-2 px-4 bg-[#EB5437] text-white rounded-lg hover:bg-[#c43824]"
        >
          {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Simpan'}
        </button>
      </div>
    </Modal>
  )
}

export default AddExtracurricularModal
