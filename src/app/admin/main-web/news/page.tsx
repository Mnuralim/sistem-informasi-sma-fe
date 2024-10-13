import React from 'react'
import Link from 'next/link'
import { FaPlus } from 'react-icons/fa'
import ListNews from './components/list-news'
import { getAllNews } from '@/lib/news'
import { auth } from '@/auth'

const Page = async () => {
  const [news, session] = await Promise.all([getAllNews(), auth()])

  return (
    <section>
      <div className="flex items-center justify-between pt-5 mx-5 mb-6 lg:mx-12">
        <h1 className="lg:text-4xl text-3xl font-bold text-[#202244] ">Daftar Berita</h1>
        <Link href="/admin/main-web/news/add">
          <button className="flex items-center py-2 px-4 border border-transparent justify-center text-sm font-medium rounded-md shadow-sm text-white bg-[#EB5437] hover:bg-[#c43824] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB5437]">
            <FaPlus /> <span className="hidden lg:block">Tambah Berita</span>
          </button>
        </Link>
      </div>
      <ListNews news={news} accessToken={session?.user.accessToken!} />
    </section>
  )
}

export default Page
