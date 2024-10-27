'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { FaSpinner } from 'react-icons/fa'
import { deleteBlog } from '@/lib/blog'
import { customRevalidation } from '@/actions/custom-revalidation'
import AddBlogModal from './add-blog'

interface Props {
  accessToken: string
  blogs: IBlog[]
}

const AdminManageBlogs = ({ accessToken, blogs }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [loadingDelete, setLoadingDelete] = useState<string | null>(null)

  const handleDeleteBlog = async (id: string) => {
    setLoadingDelete(id)

    try {
      const response = await deleteBlog(id, accessToken)
      if (response.ok) {
        customRevalidation(['/admin/main-web/blog', '/user/blog'])
        toast.success('Blog berhasil dihapus')
      }
    } catch (error) {
      toast.error('Gagal menghapus blog')
    } finally {
      setLoadingDelete(null)
    }
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Mengelola Blog</h1>
        <div className="space-y-6">
          <div className="flex justify-end mb-4">
            <button className="px-4 py-2 bg-[#EB5437] text-white rounded-lg" onClick={() => setIsModalOpen(true)}>
              Tambah Blog Baru
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                    Gambar
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                    Judul
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <tr key={blog.id} className="border-b">
                      <td className="px-6 py-4 text-sm">
                        <Image
                          src={blog.imageUrl}
                          alt={blog.title}
                          className="w-20 h-20 object-cover rounded-lg"
                          width={80}
                          height={80}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-[#202244] font-semibold">{blog.title}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/main-web/blog/${blog.id}`}
                            className="py-1.5 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg text-center"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className={`py-1.5 px-4 bg-red-500 text-white rounded-lg ${
                              loadingDelete === blog.id ? 'cursor-not-allowed' : 'hover:bg-red-700'
                            }`}
                            disabled={loadingDelete === blog.id}
                          >
                            {loadingDelete === blog.id ? <FaSpinner className="animate-spin mx-auto" /> : 'Hapus'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-4 text-gray-500">
                      Belum ada blog yang ditambahkan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddBlogModal accessToken={accessToken} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  )
}

export default AdminManageBlogs
