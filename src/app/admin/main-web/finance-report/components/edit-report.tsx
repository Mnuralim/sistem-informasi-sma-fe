import React, { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaSpinner } from 'react-icons/fa'
import { MdCloudUpload } from 'react-icons/md'
import { toast } from 'react-toastify'
import { updateFinanceReport } from '@/lib/finance-report'
import { customRevalidation } from '@/actions/custom-revalidation'
import Modal from '@/app/admin/components/modal'

interface EditFinanceReportModalProps {
  report: IFinanceReports
  accessToken: string
  onClose: () => void
}

const EditFinanceReportModal = ({ report, accessToken, onClose }: EditFinanceReportModalProps) => {
  const [title, setTitle] = useState<string>(report.title)
  const [description, setDescription] = useState<string>(report.description)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleEditReport = async () => {
    if (title && description) {
      setLoading(true)
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      if (file) {
        formData.append('file', file)
      }

      try {
        const response = await updateFinanceReport(report.id, formData, accessToken)
        const resJson = await response.json()
        if (!response.ok) {
          throw new Error(resJson.message)
        }

        customRevalidation(['/admin/main-web/finance-report', '/user/finance-report'])
        toast.success('Laporan keuangan berhasil diperbarui')
        onClose()
      } catch (error) {
        toast.error('Gagal memperbarui laporan keuangan')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold text-[#202244]">Edit Laporan Keuangan</h2>
      <input
        type="text"
        placeholder="Judul Laporan"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
      />
      <textarea
        placeholder="Deskripsi Laporan"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
      />
      <div {...getRootProps()} className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer mb-4">
        <input {...getInputProps()} />
        <MdCloudUpload size={50} className="mx-auto text-[#EB5437]" />
        <p className="text-gray-600 mt-2">Seret & letakkan file di sini, atau klik untuk memilih file</p>
      </div>
      {file && (
        <div className="mb-4">
          <p className="text-gray-700">Preview File:</p>
          <a
            href={URL.createObjectURL(file)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Lihat File
          </a>
        </div>
      )}
      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-700">
          Batal
        </button>
        <button
          onClick={handleEditReport}
          disabled={loading}
          className="py-2 px-4 bg-[#EB5437] text-white rounded-lg hover:bg-[#c43824]"
        >
          {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Simpan'}
        </button>
      </div>
    </Modal>
  )
}

export default EditFinanceReportModal
