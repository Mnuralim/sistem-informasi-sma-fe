'use client'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface Props {
  src: string
  title: string
  index: number
}

const PhotoItem = ({ src, title, index }: Props) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const openModal = () => {
    const params = new URLSearchParams(searchParams)
    params.set('index', index.toString())
    replace(`${pathname}?${params}`)
  }

  return (
    <div
      className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105 cursor-pointer"
      onClick={openModal}
    >
      <Image src={src} alt={title} layout="fill" objectFit="cover" className="w-full h-full" />
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-1">{title}</div>
    </div>
  )
}

export default PhotoItem
