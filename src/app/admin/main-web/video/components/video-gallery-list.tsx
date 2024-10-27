'use client'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { deleteVideoGallery } from '@/lib/video-gallery'
import { customRevalidation } from '@/actions/custom-revalidation'
import AddVideoModal from './add-video'
import EditVideoModal from './edit-video'

interface Props {
  videosData: IVideoGallery[]
  accessToken: string
}

const VideoGalleryList = ({ videosData, accessToken }: Props) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null)
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null)

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen)
  }

  const toggleEditModal = (id: string) => {
    setEditingVideoId(id)
  }

  const handleDeleteVideo = async (id: string) => {
    setLoadingDeleteId(id)
    try {
      const response = await deleteVideoGallery(id, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }
      customRevalidation(['/admin/main-web/video', '/user', '/user/gallery'])
      toast.success('Video berhasil dihapus')
    } catch (error) {
      toast.error('Gagal menghapus video')
    } finally {
      setLoadingDeleteId(null)
    }
  }

  return (
    <div className="min-h-screen my-5 mx-4 lg:mx-12 bg-[#f4f4f9]">
      <div className="bg-white p-5 lg:p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#202244] mb-8 text-center">Galeri Video</h1>

        <div className="flex justify-end mb-4">
          <button onClick={toggleAddModal} className="py-2 px-4 bg-orange-05 hover:bg-orange-700 text-white rounded-lg">
            Tambah Video
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Video
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Judul
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Deskripsi
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider bg-[#202244]">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {videosData.length > 0 ? (
                videosData.map((video) => (
                  <tr key={video.id} className="border-b">
                    <td className="px-6 py-4">
                      <div className="relative w-full min-h-20 lg:w-1/2 aspect-video">
                        {video.type === 'YOUTUBE' ? (
                          <iframe
                            src={video.url.replace('watch?v=', 'embed/')}
                            title="YouTube video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full object-cover rounded-lg"
                          ></iframe>
                        ) : (
                          <video src={video.url} controls className="w-full h-full object-cover rounded-lg" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#202244] font-semibold">{video.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{video.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleEditModal(video.id)}
                          className="py-1.5 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(video.id)}
                          className={`py-1.5 px-4 bg-red-500 text-white rounded-lg ${
                            loadingDeleteId === video.id ? 'cursor-not-allowed' : 'hover:bg-red-700'
                          }`}
                          disabled={loadingDeleteId === video.id}
                        >
                          {loadingDeleteId === video.id ? 'Loading...' : 'Hapus'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    Belum ada video yang ditambahkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && <AddVideoModal accessToken={accessToken} onClose={toggleAddModal} />}

      {editingVideoId && (
        <EditVideoModal
          video={videosData.find((video) => video.id === editingVideoId)!}
          accessToken={accessToken}
          onClose={() => setEditingVideoId(null)}
        />
      )}
    </div>
  )
}

export default VideoGalleryList
