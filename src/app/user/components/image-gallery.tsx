import { formatDate } from '@/utils/format-date'
import Image from 'next/image'
import React from 'react'

interface Props {
  image: IImageGallery
}

const ImageGallery = ({ image }: Props) => {
  return (
    <div
      key={image.url}
      className="w-full py-8 lg:px-5 px-3 bg-dark-blue rounded-xl flex items-center justify-center relative"
    >
      <div className="flex flex-col gap-2">
        <Image
          width={3000}
          height={3000}
          alt="principal"
          src={image.url}
          className="w-full aspect-video object-cover object-center rounded-xl"
        />
        <h1 className="text-white font-bold text-lg">{image.title}</h1>
        <p className="text-white font-medium text-sm mb-3">{formatDate(image.createdAt)}</p>
      </div>
      <div className="absolute bottom-[-22px]">
        <button className="bg-orange-05 text-sm text-white font-bold py-3 rounded-md px-3">{image.title}</button>
      </div>
    </div>
  )
}

export default ImageGallery
