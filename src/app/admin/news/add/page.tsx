import React from 'react'
import AddNews from './components/add-news'
import { auth } from '@/auth'

const Page = async () => {
  const session = await auth()
  return (
    <section>
      <AddNews accessToken={session?.user.accessToken!} />
    </section>
  )
}

export default Page
