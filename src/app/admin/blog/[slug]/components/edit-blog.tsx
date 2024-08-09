'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import 'react-quill/dist/quill.snow.css'

// React Quill harus diimport secara dinamis karena hanya berjalan di client-side
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface Blog {
  id: number
  title: string
  content: string
  image: File | null
  imageUrl: string | null
}

const initialBlogs: Blog[] = [
  { id: 1, title: 'Blog Pertama', content: 'Isi dari blog pertama.', image: null, imageUrl: null },
  { id: 2, title: 'Blog Kedua', content: 'Isi dari blog kedua.', image: null, imageUrl: null },
]

const EditBlog = () => {
  const router = useRouter()
  const { slug } = useParams()
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs)
  const [blog, setBlog] = useState<Blog | null>(null)

  useEffect(() => {
    const blogToEdit = blogs.find((b) => b.id === Number(slug))
    if (blogToEdit) {
      setBlog(blogToEdit)
    }
  }, [slug, blogs])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      const imageUrl = URL.createObjectURL(file)
      if (blog) {
        setBlog({ ...blog, image: file, imageUrl })
      }
    },
    [blog]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleTitleChange = (title: string) => {
    if (blog) {
      setBlog({ ...blog, title })
    }
  }

  const handleContentChange = (content: string) => {
    if (blog) {
      setBlog({ ...blog, content })
    }
  }

  const handleSave = () => {
    if (blog) {
      setBlogs(blogs.map((b) => (b.id === blog.id ? blog : b)))
      router.push('/admin/blog')
    }
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
                value={blog.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <ReactQuill
                value={blog.content}
                onChange={handleContentChange}
                className="w-full mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer mb-4"
              >
                <input {...getInputProps()} />
                <p>Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
              </div>
              {blog.imageUrl && (
                <div className="mb-4">
                  <p className="text-gray-700">Pratinjau:</p>
                  <Image src={blog.imageUrl} alt="Pratinjau Blog" width={128} height={128} className="object-cover" />
                </div>
              )}
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => router.push('/admin/blog')}
                  className="px-4 py-2 text-sm lg:text-base bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#EB5437] text-sm lg:text-base text-white rounded-lg hover:bg-[#c43824] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB5437]"
                >
                  Simpan Perubahan
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
