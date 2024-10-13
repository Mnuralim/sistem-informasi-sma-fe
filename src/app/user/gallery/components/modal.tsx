'use client'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface Props {
  photos: IImageGallery[]
}

const Modal = ({ photos }: Props) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const selectedPhotoIndex = Number(searchParams.get('index')) || null
  const params = new URLSearchParams(searchParams)

  console.log(selectedPhotoIndex)

  if (!selectedPhotoIndex) {
    return null
  }

  const prevPhoto = () => {
    if (selectedPhotoIndex && selectedPhotoIndex > 0) {
      if (selectedPhotoIndex === 1) {
        params.delete('index')
      } else {
        params.set('index', (selectedPhotoIndex - 1).toString())
      }
    } else {
      params.set('index', (photos.length - 1).toString())
    }
    replace(`${pathname}?${params}`, {
      scroll: false,
    })
  }

  const nextPhoto = () => {
    if (selectedPhotoIndex && selectedPhotoIndex < photos.length) {
      params.set('index', (selectedPhotoIndex + 1).toString())
    } else {
      params.delete('index')
    }
    replace(`${pathname}?${params}`, {
      scroll: false,
    })
  }

  const handleCloseModal = () => {
    params.delete('index')
    replace(`${pathname}?${params}`, {
      scroll: false,
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[200] ">
      <div className="relative bg-white rounded-lg overflow-hidden max-w-3xl mx-auto max-h-[75%]">
        <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <Image
          src={photos[selectedPhotoIndex - 1]?.url}
          alt={photos[selectedPhotoIndex - 1]?.title}
          width={800}
          height={600}
          className="object-center object-cover"
        />
        <button
          onClick={prevPhoto}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextPhoto}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Modal
