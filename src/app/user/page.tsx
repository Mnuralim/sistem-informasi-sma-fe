import React from 'react'
import Hero from './components/hero'
import Vision from './components/vision'
import Mission from './components/mission'
import PrincipalSpeech from './components/principal-speech'
import Gallery from './components/gallery'
import News from './components/news'
import Contact from './components/contact'
import { getProfile } from '@/lib/profile'
import { getSliders } from '@/lib/slider'
import { getAllNews } from '@/lib/news'

const Page = async () => {
  const [profile, sliders, news] = await Promise.all([getProfile(), getSliders(), getAllNews()])

  return (
    <main className="flex flex-col gap-12 lg:gap-20">
      <Hero name={profile.name} tagLine={profile.tagline} sliders={sliders} />
      <PrincipalSpeech />
      <Vision />
      <Mission />
      <News news={news} />
      <Gallery />
      <Contact
        email={profile.email}
        mobile={profile.mobile}
        address={profile.address}
        city={profile.city}
        province={profile.province}
        postCode={profile.postCode}
        subdistrict={profile.subdistrict}
        village={profile.village}
        mapsLink={profile.mapsLink}
      />
      <div className="h-[100px]"></div>
    </main>
  )
}

export default Page
