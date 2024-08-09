'use client'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface SliderFormProps {
  selectedImage: File | null
  setSelectedImage: (file: File | null) => void
  imagePreview: string | null
  setImagePreview: (url: string | null) => void
  isEditing: string | null
  isAddingNewImage: boolean
  handleAddOrEditSlider: (newSlider: FormData) => void
  handleCancel: () => void
  isLoading: boolean
  sliders: ISlider[]
  setIsAddingNewImage: (value: boolean) => void
}

const SliderForm: React.FC<SliderFormProps> = ({
  selectedImage,
  setSelectedImage,
  imagePreview,
  setImagePreview,
  isEditing,
  isAddingNewImage,
  handleAddOrEditSlider,
  handleCancel,
  isLoading,
  sliders,
  setIsAddingNewImage,
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setSelectedImage(file)
    setImagePreview(URL.createObjectURL(file))
    setIsAddingNewImage(true)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!selectedImage && !imagePreview) return

    const formData = new FormData()
    if (selectedImage) {
      formData.append('image', selectedImage)
    }
    handleAddOrEditSlider(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!isAddingNewImage && sliders.length < 5 && (
        <div {...getRootProps()} className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer">
          <input {...getInputProps()} />
          <p>Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
        </div>
      )}
      {isAddingNewImage && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-[#202244] mb-4">
            {isEditing !== null ? 'Edit Gambar' : 'Tambah Gambar Baru'}
          </h2>
          {imagePreview && (
            <img src={imagePreview} alt="Preview Gambar" className="w-full object-cover rounded-lg mb-4" />
          )}
          <div {...getRootProps()} className="border-dashed border-2 border-[#EB5437] p-6 text-center cursor-pointer">
            <input {...getInputProps()} />
            <p>Seret & letakkan gambar di sini, atau klik untuk memilih file</p>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700">
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#EB5437] text-white rounded-lg hover:bg-[#c43824] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EB5437] flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin mr-2" />
              ) : (
                <span>{isEditing !== null ? 'Edit Gambar' : 'Tambah Gambar'}</span>
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}

export default SliderForm
