'use client'
import React from 'react'
import SliderItem from './slider-item'

interface Props {
  sliders: ISlider[]
  handleEditSlider: (id: string) => void
  handleDeleteSlider: (id: string) => void
  loadingDeleteId: string | null
}

const SliderList = ({ sliders, handleEditSlider, handleDeleteSlider, loadingDeleteId }: Props) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-darkbg-dark-blue mb-4">Daftar Gambar Slider</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sliders &&
          sliders.map((slider, index) => (
            <SliderItem
              key={index}
              slider={slider}
              handleEditSlider={handleEditSlider}
              handleDeleteSlider={handleDeleteSlider}
              loadingDeleteId={loadingDeleteId}
            />
          ))}
      </div>
    </div>
  )
}

export default SliderList
