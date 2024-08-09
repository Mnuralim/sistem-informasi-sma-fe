import React from 'react'
import NewsItem from '../news/components/news-item'

interface Props {
  news: INews[]
}

const News = ({ news }: Props) => {
  return (
    <section className="px-3 bg-[#f9f9fa] py-10 lg:py-16">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-orange-05 font-bold text-2xl lg:text-4xl mb-5 lg:mb-12 text-center">Berita Terbaru</h1>
        <div className="grid gap-y-10 lg:grid-cols-3 gap-x-10">
          {news.map((d) => (
            <NewsItem key={d.id} news={d} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default News
