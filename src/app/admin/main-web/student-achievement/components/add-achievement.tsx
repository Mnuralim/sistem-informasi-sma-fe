import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import CustomSelect from '../../../components/custom-select'
import { createStudentAchievement } from '@/lib/student-achievement'
import { customRevalidation } from '@/actions/custom-revalidation'
import Modal from '@/app/admin/components/modal'

interface Props {
  students: IStudent[]
  accessToken: string
  onClose: () => void
}

const AddStudentAchievementModal = ({ students, accessToken, onClose }: Props) => {
  const [studentId, setStudentId] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [quotes, setQuotes] = useState<string>('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImageFile(file)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleSaveNewAchievement = async () => {
    if (studentId && description) {
      setLoading(true)
      const formData = new FormData()
      formData.append('description', description)
      formData.append('quotes', quotes)
      formData.append('studentId', studentId)

      if (imageFile) {
        formData.append('image', imageFile)
      }

      try {
        const response = await createStudentAchievement(formData, accessToken)
        const resJson = await response.json()
        if (!response.ok) {
          throw new Error(resJson.message)
        }
        customRevalidation(['/admin/main-web/student-achievements', '/admin/main-web/image', '/user', '/user/gallery'])
        toast.success('Prestasi siswa berhasil ditambahkan')
        onClose()
      } catch (error: any) {
        toast.error('Prestasi siswa gagal ditambahkan')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="text-2xl font-bold text-[#202244]">Tambah Prestasi Siswa Baru</h2>
      <CustomSelect
        label="Pilih Siswa"
        onChange={(e) => setStudentId(e)}
        value={studentId}
        options={students}
        autocomplete
      />
      <textarea
        placeholder="Deskripsi Prestasi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
      />
      <textarea
        placeholder="Quotes"
        value={quotes}
        onChange={(e) => setQuotes(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
      />
      <div {...getRootProps()} className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer">
        <input {...getInputProps()} />
        <p className="text-sm lg:text-base">Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
      </div>
      {imageFile && (
        <div className="mb-4">
          <p className="text-gray-700">Preview:</p>
          <Image
            src={URL.createObjectURL(imageFile)}
            alt="Achievement Preview"
            width={128}
            height={128}
            className="object-cover"
          />
        </div>
      )}
      <div className="flex justify-end space-x-4">
        <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700">
          Batal
        </button>
        <button
          onClick={handleSaveNewAchievement}
          disabled={loading}
          className="px-4 py-2 bg-[#EB5437] text-white rounded-lg hover:bg-[#c43824]"
        >
          {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Tambah'}
        </button>
      </div>
    </Modal>
  )
}

export default AddStudentAchievementModal
