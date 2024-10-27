import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import CustomSelect from '../../../components/custom-select'
import { customRevalidation } from '@/actions/custom-revalidation'
import { updateStaff } from '@/lib/staff'
import Modal from '@/app/admin/components/modal'

interface EditTeacherModalProps {
  staff: IStaff
  accessToken: string
  onClose: () => void
}

const EditStaffModal = ({ staff, accessToken, onClose }: EditTeacherModalProps) => {
  const [staffData, setStaffData] = useState({
    teacherName: staff.name,
    description: staff.description,
    position: staff.position,
    email: staff.email,
    gender: staff.gender,
    phoneNumber: staff.phoneNumber,
    rank: staff.rank,
    golongan: staff.golongan,
    nip: staff.nip,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [editImageUrl, setEditImageUrl] = useState<string>(staff.imageUrl)
  const [loadingEdit, setLoadingEdit] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImageFile(file)
    const imageUrl = URL.createObjectURL(file)
    setEditImageUrl(imageUrl)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleSaveEditTeacher = async () => {
    setLoadingEdit(true)
    const formData = new FormData()
    formData.append('position', staffData.position)
    formData.append('name', staffData.teacherName)
    formData.append('description', staffData.description)
    formData.append('email', staffData.email)
    formData.append('gender', staffData.gender)
    formData.append('phoneNumber', staffData.phoneNumber)
    formData.append('rank', staffData.rank)
    formData.append('golongan', staffData.golongan)
    formData.append('nip', staffData.nip)

    if (imageFile) {
      formData.append('image', imageFile)
    }
    try {
      const response = await updateStaff(staff.id, formData, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      toast.success('Data Staff berhasil diperbarui')
      customRevalidation(['/admin/data/staff', '/user/staff'])
      onClose()
    } catch (error: any) {
      toast.error('Data Staff gagal diperbarui')
    } finally {
      setLoadingEdit(false)
    }
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold text-[#202244]">Edit Guru</h2>
      <div className="space-y-4">
        <input
          value={staffData.teacherName}
          onChange={(e) => setStaffData({ ...staffData, teacherName: e.target.value })}
          type="text"
          placeholder="Nama Guru"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <input
          type="text"
          placeholder="Pangkat atau Gelar"
          value={staffData.rank}
          onChange={(e) => setStaffData({ ...staffData, rank: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <CustomSelect
          label="Jenis Kelamin"
          onChange={(value) => setStaffData({ ...staffData, gender: value as 'man' | 'woman' })}
          value={staffData.gender}
          options={[
            { id: 'man', name: 'Laki-laki' },
            { id: 'woman', name: 'Perempuan' },
          ]}
        />
        <input
          type="email"
          placeholder="Email"
          value={staffData.email}
          onChange={(e) => setStaffData({ ...staffData, email: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <input
          type="text"
          placeholder="Nomor HP"
          value={staffData.phoneNumber}
          onChange={(e) => setStaffData({ ...staffData, phoneNumber: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <input
          type="text"
          placeholder="NIP atau NIP3K"
          value={staffData.nip}
          onChange={(e) => setStaffData({ ...staffData, nip: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <input
          type="text"
          placeholder="Golongan"
          value={staffData.golongan}
          onChange={(e) => setStaffData({ ...staffData, golongan: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <input
          type="text"
          placeholder="Posisi"
          value={staffData.position}
          onChange={(e) => setStaffData({ ...staffData, position: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
        />
        <textarea
          placeholder="Deskripsi"
          value={staffData.description}
          onChange={(e) => setStaffData({ ...staffData, description: e.target.value })}
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
          onClick={handleSaveEditTeacher}
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

export default EditStaffModal
