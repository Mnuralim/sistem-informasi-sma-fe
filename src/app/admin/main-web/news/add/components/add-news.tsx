'use client'

import { createNews } from '@/lib/news'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'
import { FaSpinner } from 'react-icons/fa'
import 'react-quill/dist/quill.snow.css'
import { useRouter } from 'next/navigation'
import { customRevalidation } from '@/actions/custom-revalidation'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

interface Props {
  accessToken: string
}

const AddNews = ({ accessToken }: Props) => {
  const [title, setTitle] = useState<string>('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [editorHtml, setEditorHtml] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const handleChange = (html: string) => {
    setEditorHtml(html)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', editorHtml)
    formData.append('image', image as File)
    try {
      const response = await createNews(formData, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      toast.success(resJson.message)
      customRevalidation('/admin/main-web/news')
      setTimeout(() => {
        router.push('/admin/main-web/news')
      }, 3000)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImage(file)
    setImagePreview(URL.createObjectURL(file))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div className="min-h-screen p-5 bg-[#f4f4f9] lg:flex justify-center items-center">
      <div className="w-full max-w-3xl px-5 py-8 space-y-6 bg-white rounded-lg shadow-lg lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-center lg:text-4xl text-dark-blue">Tambah Berita</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-dark-blue">Judul Berita</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-sm text-gray-900 border rounded outline-none cursor-pointer border-slate-300/50 bg-gray-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-blue">Gambar Berita</label>
            <div
              {...getRootProps()}
              className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer mt-2 bg-gray-50"
            >
              <input {...getInputProps()} />
              <p>Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
            </div>
            {imagePreview && (
              <div className="mt-4">
                <Image
                  width={500}
                  height={500}
                  src={imagePreview}
                  alt="Preview Gambar"
                  className="object-cover object-center h-auto max-w-full rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-blue">Konten</label>
            <ReactQuill
              className="w-full aspect-[5/3] mt-2 bg-gray-50"
              value={editorHtml}
              onChange={handleChange}
              modules={AddNews.modules}
              formats={AddNews.formats}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#EB5437] hover:bg-[#c43824] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB5437]"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Tambah Berita'}
          </button>
        </form>
      </div>
    </div>
  )
}

AddNews.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['clean'],
  ],
}

AddNews.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
]

export default AddNews
