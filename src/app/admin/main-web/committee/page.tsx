import React from 'react'
import WelcomeMessage from './components/welcome-message'
import { getWelcomeMessage } from '@/lib/welcome-message'
import { auth } from '@/auth'
import { getTeacher } from '@/lib/teacher'

const Page = async () => {
  const [welcomeMessage, session, committee] = await Promise.all([
    getWelcomeMessage('committe'),
    auth(),
    getTeacher('committe'),
  ])

  return (
    <section>
      <WelcomeMessage
        welcomeMessageData={welcomeMessage}
        accessToken={session?.user.accessToken!}
        committee={committee}
      />
    </section>
  )
}

export default Page
