// components/NewsDetail.js
import React from 'react'
import Image from 'next/image'
import { WiTime2 } from 'react-icons/wi'
import { IoPersonSharp } from 'react-icons/io5'
import { MdLocalFireDepartment } from 'react-icons/md'
import { IoMdShare } from 'react-icons/io'
import { formatDate } from '@/utils/format-date'

interface Props {
  news: INews
}

const NewsDetail = ({ news }: Props) => {
  return (
    <div>
      <div className="w-full">
        <Image
          src={news.imageUrl}
          alt={news.title}
          width={800}
          height={450}
          className="object-cover w-full object-center h-auto"
        />
      </div>
      <div className="mt-10">
        <div className="flex items-center mb-4 gap-2">
          <div className="flex items-center justify-center py-1 px-3 rounded-2xl bg-dark-blue">
            <p className="font-bold text-white text-sm">Muna</p>
          </div>
          <div className="flex items-center gap-1">
            <WiTime2 className="text-sm text-black-secondary" />
            <span className="text-sm text-black-secondary">{formatDate(news.createdAt)}</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-dark-blue mb-4">{news.title}</h1>
        <div className="mt-6 text-lg text-gray-700" dangerouslySetInnerHTML={{ __html: news.content }}></div>
        <div className="flex items-center gap-2 mt-8">
          <div className="flex items-center gap-0.5">
            <IoPersonSharp className="text-sm text-black" />
            <span className="text-sm text-black-secondary">{news.author}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <MdLocalFireDepartment className="text-sm text-black" />
            <span className="text-sm text-black-secondary">123 Tayangan</span>
          </div>
          <div className="flex items-center gap-0.5">
            <IoMdShare className="text-sm text-black" />
            <span className="text-sm text-black-secondary">0 Dibagikan</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsDetail
