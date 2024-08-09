'use client'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface Video {
  id: number
  url: string
  title: string
  description: string
}

const initialVideos: Video[] = [
  {
    id: 1,
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Sample Video 1',
    description: 'Deskripsi untuk Sample Video 1',
  },
  { id: 2, url: '/video/example.mp4', title: 'Sample Video 2', description: 'Deskripsi untuk Sample Video 2' },
]

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>(initialVideos)
  const [newVideo, setNewVideo] = useState<{ url: string; title: string; description: string }>({
    url: '',
    title: '',
    description: '',
  })
  const [isAddingNewVideo, setIsAddingNewVideo] = useState<boolean>(false)
  const [isYouTube, setIsYouTube] = useState<boolean>(false)
  const [editingVideoId, setEditingVideoId] = useState<number | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newVideoUrl = URL.createObjectURL(acceptedFiles[0])
    setNewVideo({ url: newVideoUrl, title: '', description: '' })
    setIsAddingNewVideo(true)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleAddVideo = () => {
    if (newVideo.title && newVideo.description && newVideo.url) {
      setVideos([
        ...videos,
        { id: videos.length + 1, url: newVideo.url, title: newVideo.title, description: newVideo.description },
      ])
      setNewVideo({ url: '', title: '', description: '' })
      setIsAddingNewVideo(false)
    }
  }

  const handleSaveEditVideo = () => {
    if (newVideo.title && newVideo.description && newVideo.url && editingVideoId !== null) {
      setVideos(
        videos.map((video) =>
          video.id === editingVideoId
            ? { ...video, url: newVideo.url, title: newVideo.title, description: newVideo.description }
            : video
        )
      )
      setNewVideo({ url: '', title: '', description: '' })
      setIsAddingNewVideo(false)
      setEditingVideoId(null)
    }
  }

  const handleDeleteVideo = (id: number) => {
    setVideos(videos.filter((video) => video.id !== id))
  }

  const handleTitleChange = (id: number, title: string) => {
    setVideos(videos.map((video) => (video.id === id ? { ...video, title } : video)))
  }

  const handleDescriptionChange = (id: number, description: string) => {
    setVideos(videos.map((video) => (video.id === id ? { ...video, description } : video)))
  }

  const toggleEditVideo = (id: number) => {
    setEditingVideoId(editingVideoId === id ? null : id)
  }

  const handleFileChange = (file: File | null) => {
    const fileURL = file ? URL.createObjectURL(file) : ''
    setNewVideo({ ...newVideo, url: fileURL })
  }

  const handleNewUrlChange = (url: string) => {
    setNewVideo({ ...newVideo, url })
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Galeri Video</h1>
        <div className="space-y-6">
          <div className="flex justify-between">
            <button
              className={`px-4 py-2 ${isAddingNewVideo ? 'bg-gray-200' : 'bg-[#EB5437] text-white'} rounded-lg`}
              onClick={() => setIsAddingNewVideo(!isAddingNewVideo)}
            >
              {isAddingNewVideo ? 'Batal' : 'Tambah Video'}
            </button>
          </div>

          {isAddingNewVideo && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-[#202244] mb-4">
                {editingVideoId ? 'Edit Video' : 'Tambah Video Baru'}
              </h2>
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer mb-4"
              >
                <input
                  {...getInputProps()}
                  onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                />
                <p className="text-sm lg:text-base">Seret & letakkan video di sini, atau klik untuk memilih file</p>
              </div>
              {newVideo.url && !isYouTube && (
                <video src={newVideo.url} controls className="w-full object-cover rounded-lg mb-4" />
              )}
              {isYouTube && (
                <input
                  type="text"
                  placeholder="YouTube URL"
                  value={newVideo.url}
                  onChange={(e) => handleNewUrlChange(e.target.value)}
                  className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                />
              )}
              <input
                type="text"
                placeholder="Judul Video"
                value={newVideo.title}
                onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <textarea
                placeholder="Deskripsi Video"
                value={newVideo.description}
                onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
              />
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => setIsAddingNewVideo(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={editingVideoId ? handleSaveEditVideo : handleAddVideo}
                  className="px-4 py-2 bg-[#EB5437] text-white rounded-lg hover:bg-[#c43824] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB5437]"
                >
                  {editingVideoId ? 'Simpan' : 'Tambah'}
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex flex-col md:flex-row items-center justify-between border p-4 rounded-lg"
              >
                {video.url.includes('youtube') ? (
                  <iframe
                    src={video.url.replace('watch?v=', 'embed/')}
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg mb-4 md:mb-0 w-full lg:w-1/4"
                  ></iframe>
                ) : (
                  <video src={video.url} controls className="w-full lg:w-1/4 object-cover rounded-lg mb-4 md:mb-0" />
                )}
                <div className="flex-1 mx-0 lg:mx-4">
                  <input
                    type="text"
                    value={video.title}
                    onChange={(e) => handleTitleChange(video.id, e.target.value)}
                    className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Judul Video"
                    disabled={editingVideoId !== video.id}
                  />
                  <textarea
                    value={video.description}
                    onChange={(e) => handleDescriptionChange(video.id, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
                    placeholder="Deskripsi Video"
                    disabled={editingVideoId !== video.id}
                  />
                </div>
                <div className="flex lg:flex-col justify-center items-center gap-3 w-full mt-2 lg:mt-0 lg:w-20">
                  <button
                    onClick={() => toggleEditVideo(video.id)}
                    className={`w-full py-1.5 lg:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 ${
                      editingVideoId === video.id ? 'bg-green-500 hover:bg-green-700' : 'bg-blue-500 hover:bg-blue-700'
                    } text-white rounded-lg`}
                  >
                    {editingVideoId === video.id ? 'Simpan' : 'Edit'}
                  </button>
                  <button
                    onClick={() => handleDeleteVideo(video.id)}
                    className="w-full py-1.5 lg:py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Videos
