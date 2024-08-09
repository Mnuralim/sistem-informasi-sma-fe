'use client'
import React, { useState } from 'react'
import { FaDownload, FaEye } from 'react-icons/fa'
import PreviewModal from './preview-modal'
import Link from 'next/link'

type FinanceReport = {
  title: string
  type: string
  url: string
}

interface Props {
  financeReports: FinanceReport[]
}

const ListReport = ({ financeReports }: Props) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<FinanceReport | null>(null)

  const openPreview = (file: FinanceReport) => {
    setSelectedFile(file)
    setIsPreviewOpen(true)
  }

  const closePreview = () => {
    setIsPreviewOpen(false)
    setSelectedFile(null)
  }
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-[#EB5437] font-semibold tracking-wide uppercase">Laporan Keuangan</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#202244] sm:text-4xl">
            Daftar Laporan Keuangan
          </p>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {financeReports.map((report, index) => (
              <li key={index} className="px-4 py-4 sm:px-6 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className=" lg:text-lg leading-6 font-medium text-gray-900">{report.title}</h3>
                </div>
                <div className="ml-4 flex-shrink-0 flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
                  <button
                    onClick={() => openPreview(report)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <FaEye className="mr-2" />
                    Pratinjau
                  </button>
                  <Link
                    href={report.url}
                    download
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#EB5437] hover:bg-[#d94e34]"
                  >
                    <FaDownload className="mr-2" />
                    Unduh
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isPreviewOpen && selectedFile && (
        <PreviewModal isOpen={isPreviewOpen} onClose={closePreview} file={selectedFile} />
      )}
    </>
  )
}

export default ListReport
