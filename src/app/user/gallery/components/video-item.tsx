'use client'
import React, { useState, useRef } from 'react'

interface Props {
  video: IVideoGallery
}

const VideoItem = ({ video }: Props) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  return (
    <div className="relative w-full  bg-gray-200 rounded-lg overflow-hidden shadow-lg">
      {video.type === 'YOUTUBE' ? (
        <iframe
          className="w-full aspect-video"
          src={video.url.replace('watch?v=', 'embed/')}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsPlaying(true)} // Assume playing when YouTube iframe is loaded
        ></iframe>
      ) : (
        <video ref={videoRef} controls className="w-full h-full" onPlay={handlePlay} onPause={handlePause}>
          <source src={video.url} type="video/mp4" />
          Browser Anda tidak mendukung tag video.
        </video>
      )}

      {/* Conditionally render title based on the isPlaying state */}
      {!isPlaying && (
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-1">
          {video.title}
        </div>
      )}
    </div>
  )
}

export default VideoItem
