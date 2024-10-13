import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { updateVideoGallery } from '@/lib/video-gallery'
import { customRevalidation } from '@/actions/custom-revalidation'
import Modal from '@/app/admin/components/modal'

interface EditVideoModalProps {
  video: IVideoGallery
  accessToken: string
  onClose: () => void
}

const EditVideoModal = ({ video, accessToken, onClose }: EditVideoModalProps) => {
  const [updateVideo, setUpdateVideo] = useState<{ title: string; description: string }>({
    title: video.title,
    description: video.description,
  })
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false)

  const handleEditVideo = async () => {
    if (updateVideo.title && updateVideo.description) {
      setLoadingEdit(true)
      try {
        const response = await updateVideoGallery(video.id, updateVideo.title, updateVideo.description, accessToken)
        const resJson = await response.json()
        if (!response.ok) {
          throw new Error(resJson.message)
        }
        customRevalidation('/admin/main-web/video')
        toast.success('Video berhasil diperbarui')
        onClose()
      } catch (error) {
        toast.error('Gagal memperbarui video')
      } finally {
        setLoadingEdit(false)
      }
    }
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold text-[#202244]">Edit Video</h2>
      {video.type === 'YOUTUBE' ? (
        <iframe
          src={video.url.replace('watch?v=', 'embed/')}
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg w-full mb-4 aspect-video"
        ></iframe>
      ) : (
        <video src={video.url} controls className="w-full object-cover h-auto aspect-video rounded-lg mb-4" />
      )}
      <input
        type="text"
        placeholder="Judul Video"
        value={updateVideo.title}
        onChange={(e) => setUpdateVideo({ ...updateVideo, title: e.target.value })}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
      />
      <textarea
        placeholder="Deskripsi Video"
        value={updateVideo.description}
        onChange={(e) => setUpdateVideo({ ...updateVideo, description: e.target.value })}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
      />
      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-700">
          Batal
        </button>
        <button
          onClick={handleEditVideo}
          disabled={loadingEdit}
          className="py-2 px-4 bg-[#EB5437] text-white rounded-lg hover:bg-[#c43824]"
        >
          {loadingEdit ? 'Loading...' : 'Simpan'}
        </button>
      </div>
    </Modal>
  )
}

export default EditVideoModal
