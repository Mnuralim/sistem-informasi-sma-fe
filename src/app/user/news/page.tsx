import React from 'react'
import NewsItem from './components/news-item'
import { getAllNews } from '@/lib/news'

const NewsListPage = async () => {
  const allNews = await getAllNews()
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-[#EB5437] font-semibold tracking-wide uppercase">Berita Sekolah</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#202244] sm:text-4xl">
            Daftar Berita Terbaru
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allNews.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsListPage
