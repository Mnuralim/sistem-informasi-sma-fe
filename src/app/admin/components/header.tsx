import React from 'react'
import Navbar from './navbar'
import { auth } from '@/auth'

const Header = async () => {
  const session = await auth()
  return (
    <header>
      <Navbar username={session?.user.username!!} />
    </header>
  )
}

export default Header
