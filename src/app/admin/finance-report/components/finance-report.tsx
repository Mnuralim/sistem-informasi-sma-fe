'use client'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface FinanceReport {
  id: number
  title: string
  description: string
  file: File | null
  fileURL: string | null
}

const initialReports: FinanceReport[] = [
  {
    id: 1,
    title: 'Laporan Keuangan 2021',
    description: 'Deskripsi laporan keuangan 2021',
    file: null,
    fileURL: 'https://example.com/report1.pdf',
  },
  {
    id: 2,
    title: 'Laporan Keuangan 2022',
    description: 'Deskripsi laporan keuangan 2022',
    file: null,
    fileURL: 'https://example.com/report2.pdf',
  },
]

const FinanceReports = () => {
  const [reports, setReports] = useState<FinanceReport[]>(initialReports)
  const [newReport, setNewReport] = useState<{
    title: string
    description: string
    file: File | null
    fileURL: string | null
  }>({ title: '', description: '', file: null, fileURL: null })
  const [isAddingNewReport, setIsAddingNewReport] = useState<boolean>(false)
  const [editingReportId, setEditingReportId] = useState<number | null>(null)
  const [editFileURL, setEditFileURL] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      const fileURL = URL.createObjectURL(file)
      if (editingReportId !== null) {
        setReports((prevReports) =>
          prevReports.map((report) => (report.id === editingReportId ? { ...report, file, fileURL } : report))
        )
        setEditFileURL(fileURL)
      } else {
        setNewReport((prevState) => ({ ...prevState, file, fileURL }))
      }
    },
    [editingReportId]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleAddReport = () => {
    if (newReport.title && newReport.description && newReport.file) {
      setReports([
        ...reports,
        {
          id: reports.length + 1,
          title: newReport.title,
          description: newReport.description,
          file: newReport.file,
          fileURL: newReport.fileURL,
        },
      ])
      setNewReport({ title: '', description: '', file: null, fileURL: null })
      setIsAddingNewReport(false)
    }
  }

  const handleSaveEditReport = () => {
    if (editingReportId !== null) {
      setEditingReportId(null)
      setEditFileURL(null)
    }
  }

  const handleDeleteReport = (id: number) => {
    setReports(reports.filter((report) => report.id !== id))
  }

  const handleTitleChange = (id: number, title: string) => {
    setReports(reports.map((report) => (report.id === id ? { ...report, title } : report)))
  }

  const handleDescriptionChange = (id: number, description: string) => {
    setReports(reports.map((report) => (report.id === id ? { ...report, description } : report)))
  }

  const toggleEditReport = (id: number) => {
    setEditingReportId(editingReportId === id ? null : id)
    const reportToEdit = reports.find((report) => report.id === id)
    if (reportToEdit) {
      setEditFileURL(reportToEdit.fileURL)
    }
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Laporan Keuangan</h1>
        <div className="space-y-6">
          <div className="flex justify-between">
            <button
              className={`px-4 py-2 ${isAddingNewReport ? 'bg-gray-200' : 'bg-[#EB5437] text-white'} rounded-lg`}
              onClick={() => setIsAddingNewReport(!isAddingNewReport)}
            >
              {isAddingNewReport ? 'Batal' : 'Tambah Laporan'}
            </button>
          </div>

          {isAddingNewReport && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-[#202244] mb-4">Tambah Laporan Keuangan Baru</h2>
              <input
                type="text"
                placeholder="Judul Laporan"
                value={newReport.title}
                onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <textarea
                placeholder="Deskripsi Laporan"
                value={newReport.description}
                onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                <p>Seret & letakkan file di sini, atau klik untuk memilih file</p>
              </div>
              {newReport.fileURL && (
                <div className="mb-4">
                  <p className="text-gray-700">Preview:</p>
                  <a
                    href={newReport.fileURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Lihat File
                  </a>
                </div>
              )}
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setIsAddingNewReport(false)}
                  className="px-4 py-2 text-sm lg:text-base bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddReport}
                  className="px-4 py-2 bg-[#EB5437] text-sm lg:text-base text-white rounded-lg hover:bg-[#c43824] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB5437]"
                >
                  Tambah Laporan
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col md:flex-row items-center justify-between border p-4 rounded-lg"
              >
                <div className="flex-1 mr-0 lg:mr-4">
                  <input
                    type="text"
                    value={report.title}
                    onChange={(e) => handleTitleChange(report.id, e.target.value)}
                    className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Judul Laporan"
                    disabled={editingReportId !== report.id}
                  />
                  <textarea
                    value={report.description}
                    onChange={(e) => handleDescriptionChange(report.id, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Deskripsi Laporan"
                    disabled={editingReportId !== report.id}
                  />
                  {editingReportId === report.id && (
                    <div
                      {...getRootProps()}
                      className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer"
                    >
                      <input {...getInputProps()} />
                      <p>Seret & letakkan file di sini, atau klik untuk memilih file</p>
                    </div>
                  )}
                  {report.fileURL && (
                    <div className="mt-2">
                      <p className="text-gray-700">Preview:</p>
                      <a
                        href={editingReportId === report.id && editFileURL ? editFileURL : report.fileURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View File
                      </a>
                    </div>
                  )}
                </div>
                <div className="flex lg:flex-col justify-center items-center gap-3 w-full mt-2 lg:mt-0 lg:w-20">
                  <button
                    onClick={() => toggleEditReport(report.id)}
                    className="w-full py-1.5 lg:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingReportId === report.id ? 'Simpan' : 'Edit'}
                  </button>
                  <button
                    onClick={() => handleDeleteReport(report.id)}
                    className="w-full py-1.5 lg:py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinanceReports
