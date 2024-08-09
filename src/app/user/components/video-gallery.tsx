import React from 'react'

interface Props {
  video: {
    url: string
    category: string
  }
}

const VideoGallery = ({ video }: Props) => {
  return (
    <div
      key={video.url}
      className="w-full py-8 lg:px-5 px-3 bg-dark-blue rounded-xl flex items-center justify-center relative"
    >
      <div className="flex flex-col gap-2">
        <video className="w-full object-cover rounded-t-lg h-48" controls>
          <source src={video.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h1 className="text-white font-bold text-lg">Kegiatan Hari Kartini</h1>
        <p className="text-white font-medium text-sm mb-3">21 April 2024</p>
      </div>
      <div className="absolute bottom-[-22px]">
        <button className="bg-orange-05 text-sm text-white font-bold py-3 rounded-md px-3">{video.category}</button>
      </div>
    </div>
  )
}

export default VideoGallery
