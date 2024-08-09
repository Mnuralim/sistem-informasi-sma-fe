'use client'
import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import 'react-quill/dist/quill.snow.css'

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

const AdminManageBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs)
  const [newBlog, setNewBlog] = useState<{
    title: string
    content: string
    image: File | null
    imageUrl: string | null
  }>({ title: '', content: '', image: null, imageUrl: null })
  const [isAddingNewBlog, setIsAddingNewBlog] = useState<boolean>(false)
  const router = useRouter()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      const imageUrl = URL.createObjectURL(file)
      setNewBlog({ ...newBlog, image: file, imageUrl })
    },
    [newBlog]
  )

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleAddBlog = () => {
    if (newBlog.title && newBlog.content && newBlog.image) {
      setBlogs([
        ...blogs,
        {
          id: blogs.length + 1,
          title: newBlog.title,
          content: newBlog.content,
          image: newBlog.image,
          imageUrl: newBlog.imageUrl,
        },
      ])
      setNewBlog({ title: '', content: '', image: null, imageUrl: null })
      setIsAddingNewBlog(false)
    }
  }

  const handleDeleteBlog = (id: number) => {
    setBlogs(blogs.filter((blog) => blog.id !== id))
  }

  const handleEditBlog = (id: number) => {
    router.push(`/admin/blog/${id}`)
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Mengelola Blog</h1>
        <div className="space-y-6">
          <div className="flex justify-between">
            <button
              className={`px-4 py-2 ${isAddingNewBlog ? 'bg-gray-200' : 'bg-[#EB5437] text-white'} rounded-lg`}
              onClick={() => setIsAddingNewBlog(!isAddingNewBlog)}
            >
              {isAddingNewBlog ? 'Batal' : 'Tambah Blog Baru'}
            </button>
          </div>

          {isAddingNewBlog && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-[#202244] mb-4">Tambah Blog Baru</h2>
              <input
                type="text"
                placeholder="Judul"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <ReactQuill
                value={newBlog.content}
                onChange={(content) => setNewBlog({ ...newBlog, content })}
                className="w-full mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer mb-4"
              >
                <input {...getInputProps()} />
                <p>Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
              </div>
              {newBlog.imageUrl && (
                <div className="mb-4">
                  <p className="text-gray-700">Pratinjau:</p>
                  <Image
                    src={newBlog.imageUrl}
                    alt="Pratinjau Blog Baru"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setIsAddingNewBlog(false)}
                  className="px-4 py-2 text-sm lg:text-base bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddBlog}
                  className="px-4 py-2 bg-[#EB5437] text-sm lg:text-base text-white rounded-lg hover:bg-[#c43824] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB5437]"
                >
                  Tambah Blog
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="flex flex-col md:flex-row items-center justify-between border p-4 rounded-lg"
              >
                <div className="flex-1 mr-0 lg:mr-4">
                  <input
                    type="text"
                    value={blog.title}
                    className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Judul"
                    disabled
                  />
                  <div
                    className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                  {blog.imageUrl && (
                    <div className="mt-2">
                      <p className="text-gray-700">Pratinjau:</p>
                      <Image
                        src={blog.imageUrl}
                        alt="Pratinjau Blog"
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="flex lg:flex-col justify-center items-center gap-3 w-full mt-2 lg:mt-0 lg:w-20">
                  <button
                    onClick={() => handleEditBlog(blog.id)}
                    className="w-full py-1.5 lg:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(blog.id)}
                    className="w-full py-1.5 lg:py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                  >
                    Hapus
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

export default AdminManageBlogs
