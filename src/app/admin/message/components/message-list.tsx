'use client'
import React, { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { customRevalidation } from '@/actions/custom-revalidation'
import Modal from '../../components/modal'
import { deleteMessage, updateMessage } from '@/lib/message'
import { formatDate } from '@/utils/format-date'

interface Props {
  messages: IMessage[]
  accessToken: string
}

const MessageList = ({ accessToken, messages }: Props) => {
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null)

  const handleDeleteMessage = async (id: string) => {
    setLoadingDeleteId(id)
    try {
      const response = await deleteMessage(id, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      toast.success('Pesan berhasil dihapus')
      customRevalidation('/admin/message')
    } catch (error: any) {
      toast.error('Gagal menghapus pesan')
    } finally {
      setLoadingDeleteId(null)
    }
  }

  const handleAlreadyReadMessage = async (id: string) => {
    setLoadingDeleteId(id)
    try {
      const response = await updateMessage(id, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      customRevalidation('/admin/data/teacher')
    } catch (error: any) {
      console.log('Gagal memperbarui pesan')
    } finally {
      setLoadingDeleteId(null)
    }
  }

  const toggleDetailModal = async (message: IMessage) => {
    setSelectedMessage(message)
    if (!message.isRead) {
      await handleAlreadyReadMessage(message.id)
    }
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Daftar Pesan</h1>
        <div className="overflow-x-auto mt-8">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Nama Pengirim
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Pesan
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Tanggal
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id} className={`border-b ${message.isRead ? 'bg-white' : 'bg-blue-50 font-semibold'}`}>
                  <td className="px-6 py-4 text-sm text-[#202244]">{message.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{message.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 line-clamp-1">{message.message}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 line-clamp-1">{formatDate(message.createdAt)}</td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleDetailModal(message)}
                        className="py-1.5 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(message.id)}
                        className={`py-1.5 px-4 bg-red-500 text-white rounded-lg ${
                          loadingDeleteId === message.id ? 'cursor-not-allowed' : 'hover:bg-red-700'
                        }`}
                        disabled={loadingDeleteId === message.id}
                      >
                        {loadingDeleteId === message.id ? <FaSpinner className="animate-spin mx-auto" /> : 'Hapus'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedMessage && (
        <Modal onClose={() => setSelectedMessage(null)}>
          <div className="p-4 bg-white rounded-lg mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Detail Pesan</h2>
            <div className="mb-4">
              <p className="text-gray-500 font-semibold">Subject:</p>
              <p className="text-gray-800 text-lg font-medium">{selectedMessage.subject}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-500 font-semibold">Nama Pengirim:</p>
              <p className="text-gray-800 text-lg font-medium">{selectedMessage.name}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-500 font-semibold">Email:</p>
              <p className="text-gray-800 text-lg font-medium">{selectedMessage.email}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-500 font-semibold">Pesan:</p>
              <p className="text-gray-700 text-base">{selectedMessage.message}</p>
            </div>
            <button
              onClick={() => setSelectedMessage(null)}
              className="mt-6 py-2 px-6 bg-gray-600 hover:bg-gray-700 text-white rounded-lg w-full font-semibold transition ease-in-out duration-300"
            >
              Tutup
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default MessageList
