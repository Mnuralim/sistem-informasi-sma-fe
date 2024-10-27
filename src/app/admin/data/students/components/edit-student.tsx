import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { updateStudent } from '@/lib/student'
import CustomSelect from '../../../components/custom-select'
import { customRevalidation } from '@/actions/custom-revalidation'
import Modal from '@/app/admin/components/modal'

interface EditTeacherModalProps {
  student: IStudent
  accessToken: string
  onClose: () => void
  grades: IGrade[]
}

const EditStudent = ({ student, accessToken, onClose, grades }: EditTeacherModalProps) => {
  const [studentData, setStudentData] = useState({
    studentName: student.name,
    classId: student.classId,
    email: student.email,
    gender: student.gender,
    nisn: student.nisn,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [editImageUrl, setEditImageUrl] = useState<string>(student.imageUrl)
  const [loadingEdit, setLoadingEdit] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImageFile(file)
    const imageUrl = URL.createObjectURL(file)
    setEditImageUrl(imageUrl)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleSaveEditStudent = async () => {
    setLoadingEdit(true)
    const formData = new FormData()
    formData.append('classId', studentData.classId)
    formData.append('name', studentData.studentName)
    formData.append('email', studentData.email)
    formData.append('gender', studentData.gender)
    formData.append('nisn', studentData.nisn)

    if (imageFile) {
      formData.append('image', imageFile)
    }
    try {
      const response = await updateStudent(student.id, formData, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      toast.success('Data siswa berhasil diperbarui')
      customRevalidation(['/admin/data/students', '/user/student'])

      onClose()
    } catch (error: any) {
      toast.error('Gagal memperbarui data siswa')
    } finally {
      setLoadingEdit(false)
    }
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold text-[#202244]">Edit Siswa</h2>
      <div className="space-y-4">
        <input
          value={studentData.studentName}
          onChange={(e) => setStudentData({ ...studentData, studentName: e.target.value })}
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
          label={grades.find((g) => g.id === studentData.classId)?.name ?? 'Kelas'}
          onChange={(value) => setStudentData({ ...studentData, classId: value })}
          value={studentData.classId}
          options={grades}
        />
        <CustomSelect
          label="Jenis Kelamin"
          onChange={(value) => setStudentData({ ...studentData, gender: value as 'man' | 'woman' })}
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
          onClick={handleSaveEditStudent}
          className={`py-2 px-4 ${
            loadingEdit ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'
          } text-white rounded-lg`}
          disabled={loadingEdit}
        >
          {loadingEdit ? <FaSpinner className="animate-spin mx-auto" /> : 'Simpan'}
        </button>
      </div>
    </Modal>
  )
}

export default EditStudent
