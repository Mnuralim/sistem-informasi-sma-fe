import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { createTeacher } from '@/lib/teacher'
import { customRevalidation } from '@/actions/custom-revalidation'
import Modal from '@/app/admin/components/modal'

interface AddTeacherModalProps {
  accessToken: string
  onClose: () => void
}

const AddTeacherModal = ({ accessToken, onClose }: AddTeacherModalProps) => {
  const [teacherData, setTeacherData] = useState({
    teacherName: '',
    description: '',
    subject: '',
    email: '',
    gender: '',
    phoneNumber: '',
    rank: '',
    golongan: '',
    nip: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImageFile(file)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleAddTeacher = async () => {
    if (
      teacherData.teacherName &&
      teacherData.description &&
      imageFile &&
      teacherData.email &&
      teacherData.gender &&
      teacherData.phoneNumber &&
      teacherData.rank &&
      teacherData.golongan &&
      teacherData.nip
    ) {
      setLoading(true)
      const formData = new FormData()
      formData.append('name', teacherData.teacherName)
      formData.append('description', teacherData.description)
      formData.append('subject', teacherData.subject)
      formData.append('email', teacherData.email)
      formData.append('gender', teacherData.gender)
      formData.append('phoneNumber', teacherData.phoneNumber)
      formData.append('rank', teacherData.rank)
      formData.append('golongan', teacherData.golongan)
      formData.append('nip', teacherData.nip)
      formData.append('role', 'teacher')

      if (imageFile) {
        formData.append('image', imageFile)
      }

      try {
        const response = await createTeacher(formData, accessToken)
        const resJson = await response.json()
        if (!response.ok) {
          throw new Error(resJson.message)
        }
        customRevalidation('/admin/main-web/principal')
        toast.success('Kepala sekolah berhasil ditambahkan')
        onClose()
      } catch (error) {
        toast.error('Gagal menambahkan kepala sekolah')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold text-[#202244]">Tambah Guru</h2>
      <div className="space-y-4">
        <input
          value={teacherData.teacherName}
          onChange={(e) => setTeacherData({ ...teacherData, teacherName: e.target.value })}
          type="text"
          placeholder="Nama Guru"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <input
          value={teacherData.rank}
          onChange={(e) => setTeacherData({ ...teacherData, rank: e.target.value })}
          type="text"
          placeholder="Pangkat atau Gelar"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <input
          value={teacherData.email}
          onChange={(e) => setTeacherData({ ...teacherData, email: e.target.value })}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <input
          value={teacherData.phoneNumber}
          onChange={(e) => setTeacherData({ ...teacherData, phoneNumber: e.target.value })}
          type="text"
          placeholder="Nomor HP"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <input
          value={teacherData.nip}
          onChange={(e) => setTeacherData({ ...teacherData, nip: e.target.value })}
          type="text"
          placeholder="NIP atau NIP3K"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <input
          value={teacherData.golongan}
          onChange={(e) => setTeacherData({ ...teacherData, golongan: e.target.value })}
          type="text"
          placeholder="Golongan"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <textarea
          value={teacherData.description}
          onChange={(e) => setTeacherData({ ...teacherData, description: e.target.value })}
          placeholder="Deskripsi"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <div {...getRootProps()} className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer">
          <input {...getInputProps()} />
          <p className="text-sm lg:text-base">Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
        </div>
        {imageFile && (
          <div className="mt-2">
            <Image
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
        )}
      </div>
      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-700">
          Batal
        </button>
        <button
          onClick={handleAddTeacher}
          className={`py-2 px-4 ${
            loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'
          } text-white rounded-lg`}
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Tambah'}
        </button>
      </div>
    </Modal>
  )
}

export default AddTeacherModal
