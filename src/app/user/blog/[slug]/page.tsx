import { getBlogById } from '@/lib/blog'
import { formatDate } from '@/utils/format-date'
import Image from 'next/image'
import React from 'react'

interface Props {
  params: {
    slug: string
  }
}

const BlogDetailPage = async ({ params }: Props) => {
  const { slug } = params
  const blog = await getBlogById(slug)

  if (!blog) {
    return <div>Blog tidak ditemukan</div>
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            width={1200}
            height={700}
            className="w-full  object-cover rounded-md mb-6"
          />
          <h1 className="text-3xl font-bold text-[#202244] mb-4">{blog.title}</h1>
          <p className="text-sm text-gray-600 mb-6">
            oleh {blog.createdByAdmin.username} pada {formatDate(blog.createdAt)}
          </p>
          <div className="text-gray-800 dangerous-html" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </div>
    </section>
  )
}

export default BlogDetailPage
