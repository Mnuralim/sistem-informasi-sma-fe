'use client'
import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-toastify'
import { customRevalidation } from '@/actions/custom-revalidation'
import { updateBlog } from '@/lib/blog'
import { FaSpinner } from 'react-icons/fa'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface Props {
  accessToken: string
  blog: IBlog | null
}

const EditBlog = ({ accessToken, blog }: Props) => {
  const [title, setTitle] = useState<string>(blog?.title || '')
  const [content, setContent] = useState<string>(blog?.content || '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(blog?.imageUrl || null)
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const imageUrl = URL.createObjectURL(file)
    setImageFile(file)
    setImagePreview(imageUrl)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleSave = async () => {
    setLoading(true)

    const formData = new FormData()
    if (imageFile) {
      formData.append('image', imageFile)
    }
    formData.append('title', title)
    formData.append('content', content)

    try {
      const response = await updateBlog(blog!.id, formData, accessToken)
      const resJson = await response.json()

      if (!response.ok) {
        throw new Error(resJson.message)
      }
      toast.success('Blog berhasil diperbarui')
      setTimeout(() => {
        customRevalidation(['/admin/main-web/blog', '/user/blog'])
        router.push('/admin/main-web/blog')
      }, 3000)
    } catch (error: any) {
      toast.error('Gagal mengedit blog')
    } finally {
      setLoading(false)
    }
  }

  if (!blog) {
    return <div>Blog tidak ditemukan</div>
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Edit Blog</h1>
        {blog && (
          <div className="space-y-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <input
                type="text"
                placeholder="Judul"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <ReactQuill
                value={content}
                onChange={(value) => setContent(value)}
                className="w-full mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer mb-4"
              >
                <input {...getInputProps()} />
                <p>Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
              </div>
              {imagePreview && (
                <div className="mb-4">
                  <p className="text-gray-700">Pratinjau:</p>
                  <Image src={imagePreview} alt="Pratinjau Blog" width={128} height={128} className="object-cover" />
                </div>
              )}
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => router.back()}
                  className="px-4 py-2 text-sm lg:text-base bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-4 py-2 bg-[#EB5437] text-sm lg:text-base text-white rounded-lg hover:bg-[#c43824] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB5437]"
                >
                  {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Simpan Perubahan'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EditBlog
