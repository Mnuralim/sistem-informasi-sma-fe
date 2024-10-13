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
import { getWelcomeMessage } from '@/lib/welcome-message'
import { getAllImageGallery } from '@/lib/image-gallery'
import { getAllVideoGallery } from '@/lib/video-gallery'
import Slider from './components/slider'

const Page = async () => {
  const [profile, sliders, news, welcomeMessage, imageGallery, videoGallery] = await Promise.all([
    getProfile(),
    getSliders(),
    getAllNews(),
    getWelcomeMessage('headmaster'),
    getAllImageGallery(),
    getAllVideoGallery(),
  ])

  return (
    <main className="flex flex-col gap-12 lg:gap-20">
      <Hero name={profile.name} tagline={profile.tagline} logo={profile.imageUrl} />
      <Slider sliders={sliders} />
      {welcomeMessage && <PrincipalSpeech welcomeMessage={welcomeMessage} />}
      <Vision vision={profile.vision} />
      <Mission mission={profile.mission} />
      <News news={news} />
      <Gallery images={imageGallery} videos={videoGallery} />
      <Contact
        email={profile.email}
        mobile={profile.mobile}
        address={profile.address.address}
        city={profile.address.city}
        province={profile.address.province}
        postCode={profile.address.postCode}
        subdistrict={profile.address.subdistrict}
        village={profile.address.village}
        mapsLink={profile.address.mapsLink}
      />
      <div className="h-[100px]"></div>
    </main>
  )
}

export default Page
