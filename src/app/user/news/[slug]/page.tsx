import React from 'react'
import NewsDetail from './components/news-detail'
import Link from 'next/link'
import OtherNews from './components/other-news'
import { getAllNews, getNewsBySlug } from '@/lib/news'

interface Props {
  params: {
    slug: string
  }
}

const Page = async ({ params }: Props) => {
  const [news, allNews] = await Promise.all([getNewsBySlug(params.slug), getAllNews()])
  const otherNews = allNews.filter((n) => n.id !== news?.id)

  if (!news) {
    return <p>Berita tidak ditemukan</p>
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-3">
        <div className="mb-8">
          <Link href="/user/news">
            <span className="text-orange-600 hover:text-indigo-800 transition duration-300 cursor-pointer">
              &larr; Kembali ke Daftar Berita
            </span>
          </Link>
        </div>
        <div className="bg-white rounded-lg grid lg:grid-cols-3 gap-x-10 gap-y-16 shadow-lg p-6">
          <div className="lg:col-span-2">
            <NewsDetail news={news} />
          </div>
          <div className="lg:col-span-1">
            <OtherNews otherNews={otherNews} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
