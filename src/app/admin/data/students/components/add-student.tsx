import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import CustomSelect from '../../../components/custom-select'
import { customRevalidation } from '@/actions/custom-revalidation'
import Modal from '@/app/admin/components/modal'
import { createStudent } from '@/lib/student'

interface AddTeacherModalProps {
  accessToken: string
  onClose: () => void
  grades: IGrade[]
}

const AddStudent = ({ accessToken, onClose, grades }: AddTeacherModalProps) => {
  const [studentData, setStudentData] = useState({
    name: '',
    classId: '',
    nisn: '',
    email: '',
    gender: '',
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

  const handleAddStudent = async () => {
    setLoadingAdd(true)
    const formData = new FormData()
    formData.append('nisn', studentData.nisn)
    formData.append('name', studentData.name)
    formData.append('classId', studentData.classId)
    formData.append('email', studentData.email)
    formData.append('gender', studentData.gender)

    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      const response = await createStudent(formData, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      toast.success('Siswa berhasil ditambahkan')
      customRevalidation('/admin/data/students')
      onClose()
    } catch (error: any) {
      toast.error('Siswa gagal ditambahkan')
    } finally {
      setLoadingAdd(false)
    }
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold text-[#202244]">Tambah Siswa</h2>
      <div className="space-y-4">
        <input
          value={studentData.name}
          onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
          type="text"
          placeholder="Nama Siswa"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <input
          type="text"
          placeholder="NISN"
          value={studentData.nisn}
          onChange={(e) => setStudentData({ ...studentData, nisn: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <CustomSelect
          label="Pilih Kelas"
          onChange={(value) => setStudentData({ ...studentData, classId: value })}
          value={studentData.classId}
          options={grades}
        />
        <CustomSelect
          label="Jenis Kelamin"
          onChange={(value) => setStudentData({ ...studentData, gender: value })}
          value={studentData.gender}
          options={[
            { id: 'man', name: 'Laki-laki' },
            { id: 'woman', name: 'Perempuan' },
          ]}
        />
        <input
          type="email"
          placeholder="Email"
          value={studentData.email}
          onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
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
          onClick={handleAddStudent}
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

export default AddStudent
