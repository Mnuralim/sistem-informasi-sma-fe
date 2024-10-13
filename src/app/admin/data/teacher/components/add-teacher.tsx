import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import CustomSelect from '../../../components/custom-select'
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
  const [editImageUrl, setEditImageUrl] = useState<string | null>(null)
  const [loadingAdd, setLoadingAdd] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImageFile(file)
    const imageUrl = URL.createObjectURL(file)
    setEditImageUrl(imageUrl)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleAddTeacher = async () => {
    setLoadingAdd(true)
    const formData = new FormData()
    formData.append('subject', teacherData.subject)
    formData.append('name', teacherData.teacherName)
    formData.append('description', teacherData.description)
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
      toast.success('Guru berhasil ditambahkan')
      customRevalidation('/admin/data/teacher')
      onClose()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoadingAdd(false)
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
          type="text"
          placeholder="Pangkat atau Gelar"
          value={teacherData.rank}
          onChange={(e) => setTeacherData({ ...teacherData, rank: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <CustomSelect
          label="Jenis Kelamin"
          onChange={(value) => setTeacherData({ ...teacherData, gender: value })}
          value={teacherData.gender}
          options={[
            { id: 'man', name: 'Laki-laki' },
            { id: 'woman', name: 'Perempuan' },
          ]}
        />
        <input
          type="email"
          placeholder="Email"
          value={teacherData.email}
          onChange={(e) => setTeacherData({ ...teacherData, email: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <input
          type="text"
          placeholder="Nomor HP"
          value={teacherData.phoneNumber}
          onChange={(e) => setTeacherData({ ...teacherData, phoneNumber: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <input
          type="text"
          placeholder="NIP atau NIP3K"
          value={teacherData.nip}
          onChange={(e) => setTeacherData({ ...teacherData, nip: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <input
          type="text"
          placeholder="Golongan"
          value={teacherData.golongan}
          onChange={(e) => setTeacherData({ ...teacherData, golongan: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <input
          type="text"
          placeholder="Mengajar Mata Pelajaran"
          value={teacherData.subject}
          onChange={(e) => setTeacherData({ ...teacherData, subject: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <textarea
          placeholder="Deskripsi"
          value={teacherData.description}
          onChange={(e) => setTeacherData({ ...teacherData, description: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <div {...getRootProps()} className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer">
          <input {...getInputProps()} />
          <p className="text-sm lg:text-base">Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
        </div>
        {editImageUrl && (
          <div className="mt-2">
            <p className="text-gray-700">Preview:</p>
            <Image src={editImageUrl} alt="Achievement Preview" width={128} height={128} className="object-cover" />
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
            loadingAdd ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'
          } text-white rounded-lg`}
          disabled={loadingAdd}
        >
          {loadingAdd ? <FaSpinner className="animate-spin mx-auto" /> : 'Tambah'}
        </button>
      </div>
    </Modal>
  )
}

export default AddTeacherModal
