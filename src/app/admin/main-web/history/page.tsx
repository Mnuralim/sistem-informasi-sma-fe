import React from 'react'
import Form from './components/form'
import { getHistory } from '@/lib/history'
import { auth } from '@/auth'

const Page = async () => {
  const [history, session] = await Promise.all([getHistory(), auth()])

  return (
    <section>
      <h1 className="lg:text-4xl text-3xl font-bold text-[#202244] mx-5 mt-5 lg:mx-12">Sejarah Sekolah</h1>
      <Form history={history} accessToken={session?.user.accessToken!} />
    </section>
  )
}

export default Page
