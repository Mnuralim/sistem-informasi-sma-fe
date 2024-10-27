import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import CustomSelect from '../../../components/custom-select'
import { createOsis } from '@/lib/osis'
import { customRevalidation } from '@/actions/custom-revalidation'
import Modal from '@/app/admin/components/modal'

interface Props {
  students: IStudent[]
  accessToken: string
  onClose: () => void
}

const AddOsisModal = ({ students, accessToken, onClose }: Props) => {
  const [studentId, setStudentId] = useState<string>('')
  const [position, setPosition] = useState<string>('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImageFile(file)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleSaveNewOsis = async () => {
    if (studentId && position) {
      setLoading(true)
      const formData = new FormData()
      formData.append('position', position)
      formData.append('studentId', studentId)

      if (imageFile) {
        formData.append('image', imageFile)
      }

      try {
        const response = await createOsis(formData, accessToken)
        const resJson = await response.json()
        if (!response.ok) {
          throw new Error(resJson.message)
        }
        customRevalidation(['/admin/main-web/osis', '/user/osis'])
        toast.success('Data OSIS berhasil ditambahkan')
        onClose()
      } catch (error: any) {
        toast.error('Data OSIS gagal ditambahkan')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="text-2xl font-bold text-[#202244]">Tambah Anggota OSIS Baru</h2>
      <CustomSelect
        label="Pilih Siswa"
        onChange={(e) => setStudentId(e)}
        value={studentId}
        options={students}
        autocomplete
      />
      <input
        type="text"
        placeholder="Jabatan"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
      />
      <div {...getRootProps()} className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer">
        <input {...getInputProps()} />
        <p className="text-sm lg:text-base">Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
      </div>
      {imageFile && (
        <div className="mb-4">
          <Image src={URL.createObjectURL(imageFile)} alt="Preview" width={128} height={128} className="object-cover" />
        </div>
      )}
      <div className="flex justify-end space-x-4">
        <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700">
          Batal
        </button>
        <button
          onClick={handleSaveNewOsis}
          disabled={loading}
          className="px-4 py-2 bg-[#EB5437] text-white rounded-lg hover:bg-[#c43824]"
        >
          {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Tambah'}
        </button>
      </div>
    </Modal>
  )
}

export default AddOsisModal
