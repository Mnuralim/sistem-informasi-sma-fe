import React from 'react'
import Slider from './components/slider'
import { getSliders } from '@/lib/slider'
import { auth } from '@/auth'

const Page = async () => {
  const sliders = await getSliders()
  const session = await auth()
  return (
    <section>
      <Slider sliders={sliders} accessToken={session?.user.accessToken!} />
    </section>
  )
}

export default Page
