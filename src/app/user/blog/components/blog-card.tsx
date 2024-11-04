import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/utils/format-date'
import { extractFirstSentence } from '@/utils/extract-first-sentence'

interface BlogCardProps {
  id: string
  title: string
  content: string
  author: string
  date: string
  coverImage: string
}

const BlogCard = ({ id, title, content, author, date, coverImage }: BlogCardProps) => (
  <Link href={`/user/blog/${id}`}>
    <div className="bg-white shadow-lg p-6 rounded-lg mb-6 transform transition-transform hover:scale-105 cursor-pointer">
      <Image
        width={500}
        height={500}
        src={coverImage}
        alt={title}
        draggable={false}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold text-[#202244]">{title}</h3>
        <p className="text-sm text-gray-600">
          oleh {author} pada {formatDate(date)}
        </p>
        <p className="mt-2 text-gray-800 line-clamp-3">{extractFirstSentence(content)}</p>
      </div>
    </div>
  </Link>
)

export default BlogCard
