'use client'
import { customRevalidation } from '@/actions/custom-revalidation'
import { updateNews } from '@/lib/news'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaSpinner } from 'react-icons/fa'
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-toastify'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

interface Props {
  news: INews
  accessToken: string
}

const UpdateNews = ({ accessToken, news }: Props) => {
  const [title, setTitle] = useState(news.title)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(news.imageUrl)
  const [editorHtml, setEditorHtml] = useState(news.content)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleChange = (html: string) => {
    setEditorHtml(html)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()

    if (image) {
      formData.append('image', image)
    }

    formData.append('title', title)
    formData.append('content', editorHtml)

    try {
      const response = await updateNews(news.id, formData, accessToken)
      const resJson = await response.json()

      if (!response.ok) {
        throw new Error(resJson.message)
      }

      toast.success(resJson.message)
      setTimeout(() => {
        customRevalidation([
          '/admin/main-web/news',
          '/user',
          '/user/news',
          `/admmin/main-web/news/${resJson.data.slug}`,
        ])

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
        <h1 className="mb-8 text-3xl font-bold text-center lg:text-4xl text-dark-blue">Perbarui Berita</h1>
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
              <p className="text-sm lg:text-base">Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
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
              modules={UpdateNews.modules}
              formats={UpdateNews.formats}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#EB5437] hover:bg-[#c43824] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB5437]"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Simpan Berita'}
          </button>
        </form>
      </div>
    </div>
  )
}

UpdateNews.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['clean'],
  ],
}

UpdateNews.formats = [
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

export default UpdateNews
