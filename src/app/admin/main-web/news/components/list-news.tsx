'use client'
import React, { useState } from 'react'
import { FaEdit, FaSpinner, FaTrash } from 'react-icons/fa'
import Link from 'next/link'
import { formatDate } from '@/utils/format-date'
import { toast } from 'react-toastify'
import { deleteNews } from '@/lib/news'
import { customRevalidation } from '@/actions/custom-revalidation'
import 'react-toastify/dist/ReactToastify.css'

interface Props {
  news: INews[]
  accessToken: string
}

const ListNews = ({ news, accessToken }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleDeleteNews = async (id: string) => {
    setLoading(true)

    try {
      const response = await deleteNews(id, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      toast.success(resJson.message)
      customRevalidation(['/admin/main-web/news', '/user', '/user/news', `/admmin/main-web/news/${resJson.data.slug}`])
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (news.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Tidak ada berita</h1>
      </div>
    )
  }

  return (
    <div className="mx-5 overflow-x-auto lg:mx-12">
      <table className="min-w-full overflow-hidden bg-white rounded-lg shadow">
        <thead className="bg-[#202244] text-white">
          <tr>
            <th className="px-6 py-3 text-left">Judul</th>
            <th className="px-6 py-3 text-left">Tanggal</th>
            <th className="px-6 py-3 text-left">Penulis</th>
            <th className="px-6 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item.id} className="border-b border-gray-200">
              <td className="px-6 py-4 text-left">{item.title}</td>
              <td className="px-6 py-4 text-left">{formatDate(item.createdAt)}</td>
              <td className="px-6 py-4 text-left">{item.author}</td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center space-x-4 items-center">
                  <Link href={`/admin/main-web/news/${item.slug}`}>
                    <button className="text-[#EB5437] hover:text-[#c43824]">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    disabled={loading}
                    onClick={() => handleDeleteNews(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    {loading ? <FaSpinner className="animate-spin mx-auto" /> : <FaTrash />}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListNews
