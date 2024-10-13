'use client'
import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface SliderItemProps {
  slider: ISlider
  handleEditSlider: (id: string) => void
  handleDeleteSlider: (id: string) => void
  loadingDeleteId: string | null
}

const SliderItem: React.FC<SliderItemProps> = ({ slider, handleEditSlider, handleDeleteSlider, loadingDeleteId }) => {
  const isLoading = loadingDeleteId === slider.id

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
      <img src={slider.imageUrl} alt={`Slider ${slider.id}`} className="w-full h-48 object-cover rounded-md" />
      <div className="flex justify-end space-x-4 mt-4">
        <button
          onClick={() => handleEditSlider(slider.id)}
          className="px-3 py-1 bg-dark-blue text-white text-sm font-medium rounded-lg hover:bg-[#1a1c3d]"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteSlider(slider.id)}
          className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-700 flex items-center"
          disabled={isLoading}
        >
          {isLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : 'Hapus'}
        </button>
      </div>
    </div>
  )
}

export default SliderItem
