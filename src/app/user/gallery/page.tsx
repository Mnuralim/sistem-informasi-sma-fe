import React from 'react'
import Tab from './components/tab'
import PhotoItem from './components/photo-item'
import Modal from './components/modal'
import VideoItem from './components/video-item'

interface Props {
  searchParams: {
    type: string
  }
}

const photos = [
  { src: '/img/misi.png', title: 'Foto 1' },
  { src: '/img/visi.png', title: 'Foto 2' },
  { src: '/img/slide1.jpg', title: 'Foto 3' },
  { src: '/img/misi.png', title: 'Foto 4' },
]

const videos = [
  { src: '/video/example.mp4', title: 'Video 1' },
  { src: '/video/example.mp4', title: 'Video 2' },
]

const GalleryPage = ({ searchParams }: Props) => {
  const activeTab = searchParams.type
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-[#EB5437] font-semibold tracking-wide uppercase">Galeri Sekolah</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#202244] sm:text-4xl">
            Foto dan Video
          </p>
        </div>
        <Tab />
        <div>
          {activeTab === 'photos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {photos.map((photo, index) => (
                <PhotoItem key={index} src={photo.src} title={photo.title} index={index + 1} />
              ))}
            </div>
          )}
          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {videos.map((video, index) => (
                <VideoItem key={index} {...video} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Modal photos={photos} />
    </section>
  )
}
export default GalleryPage
