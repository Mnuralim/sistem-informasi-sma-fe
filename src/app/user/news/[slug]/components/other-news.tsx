import Image from 'next/image'
import React from 'react'
import { IoIosArrowBack, IoIosArrowForward, IoMdShare } from 'react-icons/io'
import { WiTime2 } from 'react-icons/wi'
import { IoPersonSharp } from 'react-icons/io5'
import { MdLocalFireDepartment } from 'react-icons/md'
import { formatDate } from '@/utils/format-date'
import { extractFirstSentence } from '@/utils/extract-first-sentence'
import Link from 'next/link'

interface Props {
  otherNews: INews[]
}

const OtherNews = ({ otherNews }: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-dark-blue font-bold text-xl lg:text-2xl">Berita Lainnya</h1>
        <div className="flex items-center gap-5">
          <button className="bg-dark-blue p-1 rounded-sm hover:bg-orange-05 transition-colors duration-200">
            <IoIosArrowBack color="white" className="text-[20px]" />
          </button>
          <button className="bg-dark-blue p-1 rounded-sm hover:bg-orange-05 transition-colors duration-200">
            <IoIosArrowForward color="white" className="text-[20px]" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-y-6">
        {otherNews.map((news) => (
          <Link href={`/user/news/${news.slug}`} key={news.id} className="grid grid-cols-3 gap-5 group">
            <div className="col-span-1">
              <Image
                alt={news.title}
                src={news.imageUrl}
                width={500}
                height={500}
                className="object-cover object-center w-full aspect-square rounded-sm shadow-md overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>

            <div className="col-span-2 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center py-0.5 px-3 rounded-2xl bg-dark-blue">
                  <p className="font-bold text-white text-xs">Muna</p>
                </div>
                <div className="flex items-center gap-1">
                  <WiTime2 className="text-sm text-black-secondary" />
                  <span className="text-xs text-black-secondary">{formatDate(news.createdAt)}</span>
                </div>
              </div>
              <h1 className="line-clamp-2 text-dark-blue font-bold underline group-hover:text-orange-05 transition-colors duration-200">
                {extractFirstSentence(news.title)}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  <IoPersonSharp className="text-xs text-black" />
                  <span className="text-[10px] text-black-secondary">{news.author}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <MdLocalFireDepartment className="text-xs text-black" />
                  <span className="text-[10px] text-black-secondary">123 Tayangan</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <IoMdShare className="text-xs text-black" />
                  <span className="text-[10px] text-black-secondary">0 Dibagikan</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default OtherNews
