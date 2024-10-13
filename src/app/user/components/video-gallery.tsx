import React from 'react'

interface Props {
  video: IVideoGallery
}

const VideoGallery = ({ video }: Props) => {
  return (
    <div
      key={video.url}
      className="w-full py-8 lg:px-5 px-3 bg-dark-blue rounded-xl flex items-center justify-center relative"
    >
      <div className="flex flex-col gap-2">
        {video.type === 'YOUTUBE' ? (
          <iframe
            className="w-full rounded-t-lg  aspect-video"
            src={video.url.replace('watch?v=', 'embed/')}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video className="w-full rounded-t-lg aspect-video" controls>
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <h1 className="text-white font-bold text-lg">{video.title}</h1>
        <p className="text-white font-medium text-sm mb-3">{video.description}</p>
      </div>
      <div className="absolute bottom-[-22px]">
        <button className="bg-orange-05 text-sm text-white font-bold py-3 rounded-md px-3">{video.title}</button>
      </div>
    </div>
  )
}

export default VideoGallery
