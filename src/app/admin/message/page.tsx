import React from 'react'
import { auth } from '@/auth'
import MessageList from './components/message-list'
import { getMessages } from '@/lib/message'

const Page = async () => {
  const [session, messages] = await Promise.all([auth(), getMessages()])
  return (
    <section>
      <MessageList accessToken={session?.user.accessToken!} messages={messages} />
    </section>
  )
}

export default Page
