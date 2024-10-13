import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/utils/format-date'
import { extractFirstSentence } from '@/utils/extract-first-sentence'

interface Props {
  news: INews
}

const NewsItem = ({ news }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-lg">
      <div className="w-full">
        <Image src={news.imageUrl} alt={news.title} width={500} height={300} className="object-cover w-full h-48" />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#202244] mb-4">{news.title}</h2>
        <p className="text-base text-gray-600 mb-4 line-clamp-2">{extractFirstSentence(news.content)}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 line-clamp-1">{formatDate(news.createdAt)}</span>
          <Link
            className="text-[#EB5437] hover:text-[#202244] text-sm transition duration-300"
            href={`/user/news/${news.slug}`}
          >
            Selengkapnya
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NewsItem
