import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { createVideoGallery } from '@/lib/video-gallery'
import { customRevalidation } from '@/actions/custom-revalidation'
import Modal from '@/app/admin/components/modal'

interface AddVideoModalProps {
  accessToken: string
  onClose: () => void
}

const AddVideoModal = ({ accessToken, onClose }: AddVideoModalProps) => {
  const [isYouTube, setIsYouTube] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [newVideo, setNewVideo] = useState<{ url: string; title: string; description: string; type: string }>({
    url: '',
    title: '',
    description: '',
    type: 'UPLOAD',
  })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newVideoUrl = URL.createObjectURL(acceptedFiles[0])
    setNewVideo({ url: newVideoUrl, title: '', description: '', type: 'UPLOAD' })
    setFile(acceptedFiles[0])
    setIsYouTube(false)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleNewUrlChange = (url: string) => {
    setNewVideo({ ...newVideo, url, type: 'YOUTUBE' })
    setIsYouTube(true)
    setFile(null)
  }

  const handleAddVideo = async () => {
    if (newVideo.title && newVideo.description && (newVideo.url || file)) {
      setLoading(true)
      try {
        const formData = new FormData()
        if (file) {
          formData.append('video', file)
        }
        if (newVideo.type === 'YOUTUBE') {
          formData.append('url', newVideo.url)
        }
        formData.append('title', newVideo.title)
        formData.append('description', newVideo.description)
        formData.append('type', newVideo.type)

        const response = await createVideoGallery(formData, accessToken)
        const resJson = await response.json()

        if (!response.ok) {
          throw new Error(resJson.message)
        }

        customRevalidation('/admin/main-web/video')
        toast.success('Video baru berhasil ditambahkan')
        onClose()
      } catch (error) {
        toast.error('Gagal menambahkan video baru')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-bold text-[#202244]">Tambah Video Baru</h2>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setIsYouTube(false)}
          className={`px-4 py-2 rounded-lg ${!isYouTube ? 'bg-[#EB5437] text-white' : 'bg-gray-200'}`}
        >
          Unggah Video
        </button>
        <button
          onClick={() => setIsYouTube(true)}
          className={`px-4 py-2 rounded-lg ${isYouTube ? 'bg-[#EB5437] text-white' : 'bg-gray-200'}`}
        >
          Masukkan URL YouTube
        </button>
      </div>

      {!isYouTube && (
        <div
          {...getRootProps()}
          className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer mb-4"
        >
          <input {...getInputProps()} />
          <p className="text-sm lg:text-base">Seret & letakkan video di sini, atau klik untuk memilih file</p>
        </div>
      )}
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
      <div className="flex justify-end gap-3">
        <button onClick={onClose} className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-700">
          Batal
        </button>
        <button
          onClick={handleAddVideo}
          disabled={loading}
          className="py-2 px-4 bg-[#EB5437] text-white rounded-lg hover:bg-[#c43824]"
        >
          {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Tambah'}
        </button>
      </div>
    </Modal>
  )
}

export default AddVideoModal
