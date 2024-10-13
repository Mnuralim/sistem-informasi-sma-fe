import React from 'react'
import EditBlog from './components/edit-blog'
import { getBlogById } from '@/lib/blog'
import { auth } from '@/auth'

interface Props {
  params: {
    slug: string
  }
}

const Page = async ({ params }: Props) => {
  const [session, blog] = await Promise.all([auth(), getBlogById(params.slug)])
  return (
    <section>
      <EditBlog accessToken={session?.user.accessToken!} blog={blog} />
    </section>
  )
}

export default Page
