'use client'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-toastify'
import { updateWelcomeMessage } from '@/lib/welcome-message'
import { customRevalidation } from '@/actions/custom-revalidation'
import { FaSpinner } from 'react-icons/fa'
import CustomSelect from '../../../components/custom-select'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface Props {
  welcomeMessageData: IWelcomeMessage
  accessToken: string
  committee: ITeacher[]
}

const WelcomeMessage = ({ welcomeMessageData, accessToken, committee }: Props) => {
  const [welcomeMessage, setWelcomeMessage] = useState<string>(welcomeMessageData?.message || '')
  const [committeeId, setCommitteeId] = useState<string>(welcomeMessageData?.teacherId || '')
  const [loading, setLoading] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)

  const handleSaveMessage = async () => {
    setLoading(true)
    try {
      const response = await updateWelcomeMessage(
        'committe',
        { message: welcomeMessage, teacherId: committeeId },
        accessToken
      )
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      toast.success('Sukses menambahkan sambutan komite sekolah')
      customRevalidation('/admin/main-web/committee')
    } catch (error: any) {
      toast.error('Gagal menambahkan sambutan komite sekolah')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9] ">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="lg:text-4xl text-3xl font-bold text-[#202244] mb-8 text-center">Sambutan Komite Sekolah</h1>
        {welcomeMessageData || showForm ? (
          <div className="space-y-6">
            {/* <input
              type="text"
              value={committeeId}
              onChange={(e) => setCommitteeId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg outline-none bg-gray-50 border-gray-300 focus:border-orange-05 focus:ring-2 focus:ring-orange-05"
              placeholder="Masukkan nama kepala sekolah"
            /> */}
            <CustomSelect
              label="Pilih Komite Sekolah"
              onChange={(e) => setCommitteeId(e)}
              value={committeeId}
              options={committee}
            />

            <ReactQuill
              value={welcomeMessage}
              onChange={setWelcomeMessage}
              theme="snow"
              className="mb-4 w-full aspect-square lg:aspect-[3/1]"
              placeholder="Tulis sambutan kepala sekolah di sini..."
            />
            <div>
              <button
                onClick={handleSaveMessage}
                disabled={loading}
                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#EB5437] hover:bg-[#c43824] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB5437]"
              >
                {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Simpan'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-center">
              Sambutan komite sekolah tidak ditemukan, untuk menambahkan data sambutan klik{' '}
              <button onClick={() => setShowForm(true)} className="text-[#EB5437]">
                disini
              </button>{' '}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WelcomeMessage
