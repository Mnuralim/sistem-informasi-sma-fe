import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface BlogCardProps {
  slug: string
  title: string
  summary: string
  author: string
  date: string
  coverImage: string
}

const BlogCard: React.FC<BlogCardProps> = ({ slug, title, summary, author, date, coverImage }) => {
  return (
    <Link href={`/user/blog/${slug}`}>
      <div className="bg-white shadow-lg p-6 rounded-lg mb-6 transform transition-transform hover:scale-105 cursor-pointer h-full flex flex-col">
        <div className="flex-shrink-0">
          <Image
            width={500}
            height={500}
            src={coverImage}
            alt={title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        </div>
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[#202244]">{title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              By {author} on {date}
            </p>
            <p className="mt-2 text-gray-800 line-clamp-3">{summary}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard
