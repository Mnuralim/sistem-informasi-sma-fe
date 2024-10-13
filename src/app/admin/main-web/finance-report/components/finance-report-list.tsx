'use client'
import React, { useState } from 'react'
import { FiFileText, FiLoader } from 'react-icons/fi'
import { formatDate } from '@/utils/format-date'
import { deleteFinanceReport } from '@/lib/finance-report'
import { customRevalidation } from '@/actions/custom-revalidation'
import { toast } from 'react-toastify'
import AddFinanceReportModal from './add-report'
import EditFinanceReportModal from './edit-report'

interface Props {
  accessToken: string
  reports: IFinanceReports[]
}

const FinanceReportsList = ({ accessToken, reports }: Props) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [editingReportId, setEditingReportId] = useState<string | null>(null)
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null)

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen)
  }

  const toggleEditModal = (id: string) => {
    setEditingReportId(id)
  }

  const handleDeleteReport = async (id: string) => {
    setLoadingDeleteId(id)
    try {
      const response = await deleteFinanceReport(id, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      customRevalidation('/admin/main-web/finance-report')
      toast.success('Laporan keuangan berhasil dihapus')
    } catch (error) {
      toast.error('Gagal menghapus laporan')
    } finally {
      setLoadingDeleteId(null)
    }
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Laporan Keuangan</h1>
        <div className="flex justify-end mb-4">
          <button onClick={toggleAddModal} className="py-2 px-4 bg-orange-05 hover:bg-orange-700 text-white rounded-lg">
            Tambah Laporan
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Judul
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Deskripsi
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Dipublikasikan
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  File
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report.id} className="border-b">
                    <td className="px-6 py-4 text-sm text-[#202244] font-semibold">{report.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{report.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(report.createdAt)}</td>
                    <td className="px-6 py-4 text-sm text-blue-500">
                      {report.fileUrl ? (
                        <a
                          href={report.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center hover:text-blue-700"
                        >
                          <FiFileText size={20} className="mr-1" /> Lihat Laporan
                        </a>
                      ) : (
                        'Tidak ada file'
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleEditModal(report.id)}
                          className="py-1.5 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReport(report.id)}
                          className={`py-1.5 px-4 bg-red-500 text-white rounded-lg ${
                            loadingDeleteId === report.id ? 'cursor-not-allowed' : 'hover:bg-red-700'
                          }`}
                          disabled={loadingDeleteId === report.id}
                        >
                          {loadingDeleteId === report.id ? <FiLoader className="animate-spin mx-auto" /> : 'Hapus'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Belum ada laporan keuangan yang ditambahkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && <AddFinanceReportModal accessToken={accessToken} onClose={toggleAddModal} />}

      {editingReportId && (
        <EditFinanceReportModal
          report={reports.find((report) => report.id === editingReportId)!}
          accessToken={accessToken}
          onClose={() => setEditingReportId(null)}
        />
      )}
    </div>
  )
}

export default FinanceReportsList
