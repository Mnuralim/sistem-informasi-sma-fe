import React from 'react'
import WelcomeMessage from './components/welcome-message'
import { getWelcomeMessage } from '@/lib/welcome-message'
import { auth } from '@/auth'
import { getTeacher } from '@/lib/teacher'

const Page = async () => {
  const [welcomeMessage, session, headmaster] = await Promise.all([
    getWelcomeMessage('headmaster'),
    auth(),
    getTeacher('headmaster'),
  ])

  return (
    <section>
      <WelcomeMessage
        welcomeMessageData={welcomeMessage}
        accessToken={session?.user.accessToken!}
        headmaster={headmaster}
      />
    </section>
  )
}

export default Page
