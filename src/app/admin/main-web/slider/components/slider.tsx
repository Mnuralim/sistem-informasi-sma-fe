'use client'
import React, { useState } from 'react'
import SliderForm from './slider-form'
import SliderList from './slider-list'
import { toast } from 'react-toastify'
import { createSlider, deleteSlider, updateSlider } from '@/lib/slider'
import { customRevalidation } from '@/actions/custom-revalidation'

interface Props {
  sliders: ISlider[]
  accessToken: string
}

const Slider = ({ sliders, accessToken }: Props) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isAddingNewImage, setIsAddingNewImage] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null)

  const handleAddOrEditSlider = async (newSlider: FormData) => {
    setIsLoading(true)
    try {
      if (isEditing !== null) {
        const response = await updateSlider(isEditing, newSlider, accessToken)
        const resJson = await response.json()

        if (!response.ok) {
          throw new Error(resJson.message)
        }
        customRevalidation('/admin/main-web/slider')
        toast.success(resJson.message)
      } else {
        if (sliders.length < 5) {
          const response = await createSlider(newSlider, accessToken)
          const resJson = await response.json()
          if (!response.ok) {
            throw new Error(resJson.message)
          }
          customRevalidation('/admin/main-web/slider')
          toast.success(resJson.message)
        }
      }
      setSelectedImage(null)
      setImagePreview(null)
      setIsAddingNewImage(false)
      setIsEditing(null)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteSlider = async (id: string) => {
    setLoadingDeleteId(id)
    try {
      const response = await deleteSlider(id, accessToken)
      const resJson = await response.json()

      if (!response.ok) {
        throw new Error(resJson.message)
      }
      customRevalidation('/admin/main-web/slider')
      toast.success(resJson.message)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoadingDeleteId(null)
    }
  }

  const handleEditSlider = (id: string) => {
    const sliderToEdit = sliders.find((slider) => slider.id === id)
    if (sliderToEdit) {
      setSelectedImage(null)
      setImagePreview(sliderToEdit.imageUrl)
      setIsEditing(id)
      setIsAddingNewImage(true)
    }
  }

  const handleCancel = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setIsAddingNewImage(false)
    setIsEditing(null)
  }

  return (
    <div className="min-h-screen bg-[#f4f4f9] mx-5 my-5 lg:mx-12">
      <div className="bg-white p-4 lg:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-darkbg-dark-blue mb-8 text-center">Slider Hero Image</h1>
        <SliderForm
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          isEditing={isEditing}
          isAddingNewImage={isAddingNewImage}
          handleAddOrEditSlider={handleAddOrEditSlider}
          handleCancel={handleCancel}
          sliders={sliders}
          setIsAddingNewImage={setIsAddingNewImage}
          isLoading={isLoading}
        />
        <SliderList
          sliders={sliders}
          handleEditSlider={handleEditSlider}
          handleDeleteSlider={handleDeleteSlider}
          loadingDeleteId={loadingDeleteId}
        />
      </div>
    </div>
  )
}

export default Slider
