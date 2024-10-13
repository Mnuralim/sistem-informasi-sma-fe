import React from 'react'
import UpdateNews from './components/update-news'
import { auth } from '@/auth'
import { getNewsBySlug } from '@/lib/news'

interface Props {
  params: {
    slug: string
  }
}

const Page = async ({ params }: Props) => {
  const [session, news] = await Promise.all([await auth(), await getNewsBySlug(params.slug)])

  if (!news) {
    return <p>Berita tidak ditemukan</p>
  }

  return (
    <section>
      <UpdateNews accessToken={session?.user.accessToken!} news={news} />
    </section>
  )
}

export default Page
