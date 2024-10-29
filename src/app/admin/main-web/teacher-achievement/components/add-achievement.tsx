import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import { FaSpinner } from 'react-icons/fa'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import { createAchievement } from '@/lib/teacher-achievement'
import { customRevalidation } from '@/actions/custom-revalidation'
import CustomSelect from '../../../components/custom-select'
import { useRouter, useSearchParams } from 'next/navigation'
import Modal from '@/app/admin/components/modal'

interface Props {
  dataEntity: ITeacher[] | IStaff[]
  accessToken: string
  onClose: () => void
}

const AddAchievementModal = ({ dataEntity, accessToken, onClose }: Props) => {
  const [award, setAward] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [entityId, setEntityId] = useState<string>('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type') || ''
  const { replace } = useRouter()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImageFile(file)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleSaveNewAchievement = async () => {
    if (award && year && entityId) {
      setLoading(true)
      const formData = new FormData()
      formData.append('award', award)
      formData.append('year', year)
      formData.append('entityId', entityId)
      formData.append('type', typeParam)

      if (imageFile) {
        formData.append('image', imageFile)
      }

      try {
        const response = await createAchievement(formData, accessToken)
        const resJson = await response.json()
        if (!response.ok) {
          throw new Error(resJson.message)
        }
        customRevalidation([
          '/admin/main-web/teacher-achievement',
          '/admin/main-web/image',
          '/user',
          '/user/gallery',
          '/user/achievement',
        ])
        toast.success('Prestasi berhasil ditambahkan')
        onClose()
      } catch (error) {
        toast.error('Gagal menambahkan prestasi')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSetType = (value: string) => {
    replace(`/admin/main-web/teacher-achievement?type=${value}`, {
      scroll: false,
    })
    setEntityId('')
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="text-2xl font-bold text-[#202244]">Tambah Prestasi</h2>

      <input
        type="text"
        placeholder="Deskripsi Prestasi"
        value={award}
        onChange={(e) => setAward(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
      />
      <input
        type="text"
        placeholder="Tahun"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
      />
      <CustomSelect
        options={[
          {
            id: 'teacher',
            name: 'Guru',
          },
          {
            id: 'staff',
            name: 'Karyawan',
          },
        ]}
        value={typeParam}
        onChange={handleSetType}
        label="Pilih Tipe"
        onOpen={() => setIsAutocompleteOpen('type')}
        onClose={() => setIsAutocompleteOpen(null)}
        isOpen={isAutocompleteOpen === 'type'}
      />

      {dataEntity.length > 0 ? (
        <CustomSelect
          options={dataEntity}
          value={entityId}
          onChange={setEntityId}
          label="Pilih Guru atau Karyawan"
          autocomplete
        />
      ) : null}

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

export default AddAchievementModal
