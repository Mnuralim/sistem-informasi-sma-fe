'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Image from 'next/image'

interface ISlider {
  imageUrl: string
  id: string
}

interface Props {
  sliders: ISlider[]
}

const Slider = ({ sliders }: Props) => {
  return (
    <section className="max-w-7xl mx-auto w-full lg:px-7">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper "
      >
        {sliders.map((slider, index) => (
          <SwiperSlide key={index}>
            <Image
              src={slider.imageUrl}
              draggable={false}
              alt={slider.id}
              width={4000}
              height={3000}
              className="object-center object-cover w-full rounded-lg h-auto aspect-[4/3]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* 
      <div className="absolute w-full h-full bg-black bg-opacity-40 hover:bg-opacity-50 transition-all duration-300 ease-in-out top-0 z-50 flex items-center justify-center flex-col lg:gap-3">
        <p className="text-white text-sm font-semibold lg:text-xl">Selamat Datang di Laman</p>
        <h1 className="text-white text-2xl lg:text-4xl font-bold drop-shadow-lg">{name}</h1>
        <p className="text-white text-sm font-semibold lg:text-xl">{tagLine}</p>
      </div> */}
    </section>
  )
}

export default Slider
