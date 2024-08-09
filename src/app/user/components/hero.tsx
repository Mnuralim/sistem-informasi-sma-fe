'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

interface Props {
  name: string
  tagLine: string
  sliders: ISlider[]
}

const images = ['/img/slide2.jpg', '/img/slide3.jpeg']

const Hero = ({ name, tagLine, sliders }: Props) => {
  return (
    <section className="relative shadow">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {sliders.map((slider, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-auto aspect-[4/3] bg-no-repeat bg-center bg-cover lg:aspect-auto lg:h-[calc(100vh-128px)]"
              style={{
                backgroundImage: `url('${slider.imageUrl}')`,
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute w-full h-full bg-black bg-opacity-15 top-0 z-50 flex items-center justify-center flex-col lg:gap-3">
        <p className="text-white text-sm font-semibold lg:text-xl">Selamat Datang di Laman</p>
        <h1 className="text-white text-2xl font-bold lg:text-4xl">{name}</h1>
        <p className="text-white text-sm font-semibold lg:text-xl">{tagLine}</p>
      </div>
    </section>
  )
}

export default Hero
