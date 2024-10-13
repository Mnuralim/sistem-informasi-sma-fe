import React from 'react'
import AdminManageBlogs from './components/manage-blog'
import { getBlog } from '@/lib/blog'
import { auth } from '@/auth'

const Page = async () => {
  const [session, blogs] = await Promise.all([auth(), getBlog()])
  return (
    <section>
      <AdminManageBlogs accessToken={session?.user.accessToken!} blogs={blogs} />
    </section>
  )
}

export default Page
