import React from 'react'

interface Props {
  src: string
  title: string
}

const VideoItem = ({ src, title }: Props) => {
  return (
    <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
      <video controls className="w-full h-full object-cover">
        <source src={src} type="video/mp4" />
        Browser Anda tidak mendukung tag video.
      </video>
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-1">{title}</div>
    </div>
  )
}

export default VideoItem
