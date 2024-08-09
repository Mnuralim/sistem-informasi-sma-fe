import Image from 'next/image'
import React from 'react'

interface Props {
  image: {
    url: string
    category: string
  }
}

const ImageGallery = ({ image }: Props) => {
  return (
    <div
      key={image.url}
      className="w-full py-8 lg:px-5 px-3 bg-dark-blue rounded-xl flex items-center justify-center relative"
    >
      <div className="flex flex-col gap-2">
        <Image width={300} height={300} alt="principal" src={image.url} className="w-full aspect-[4/3] rounded-xl" />
        <h1 className="text-white font-bold text-lg">Kegiatan Hari Kartini</h1>
        <p className="text-white font-medium text-sm mb-3">21 April 2024</p>
      </div>
      <div className="absolute bottom-[-22px]">
        <button className="bg-orange-05 text-sm text-white font-bold py-3 rounded-md px-3">{image.category}</button>
      </div>
    </div>
  )
}

export default ImageGallery
