'use client'
import React, { useState } from 'react'
import ImageGallery from './image-gallery'
import VideoGallery from './video-gallery'

interface Props {
  images: IImageGallery[]
  videos: IVideoGallery[]
}

const Gallery = ({ images, videos }: Props) => {
  const [type, setType] = useState<string>('photo')

  const changeType = (type: string) => {
    setType(type)
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-3 py-10 lg:py-16">
      <h1 className="text-orange-05 font-bold text-2xl lg:text-4xl mb-8 lg:mb-12 text-center">Galeri dan Video</h1>
      <div className="bg-gray-200 rounded-xl flex items-center mb-8 lg:mb-12 overflow-hidden">
        <button
          onClick={() => changeType('photo')}
          className={`transition-colors duration-300 ease-linear w-full font-semibold text-sm lg:text-base leading-5 py-3 ${
            type === 'photo' ? 'bg-orange-05 text-white' : 'bg-transparent text-black-primary'
          }`}
        >
          Foto
        </button>
        <button
          onClick={() => changeType('video')}
          className={`transition-colors duration-300 ease-linear w-full font-semibold text-sm lg:text-base leading-5 py-3 ${
            type === 'video' ? 'bg-orange-05 text-white' : 'bg-transparent text-black-primary'
          }`}
        >
          Video
        </button>
      </div>
      <div className="grid gap-y-12 md:grid-cols-2 lg:grid-cols-3 gap-x-12">
        {type === 'photo' && images.map((image) => <ImageGallery key={image.url} image={image} />)}
        {type === 'video' && videos.map((video) => <VideoGallery key={video.url} video={video} />)}
      </div>
    </section>
  )
}

export default Gallery
