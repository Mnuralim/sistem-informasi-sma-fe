'use client'
import { customRevalidation } from '@/actions/custom-revalidation'
import { updateVisionMision } from '@/lib/vision-mission'
import React, { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'

interface Props {
  id: string
  visionData: string
  missionData: string
  accessToken: string
}

const Form = ({ id, missionData, visionData, accessToken }: Props) => {
  const [vision, setVision] = useState<string>(visionData)
  const [mission, setMission] = useState<string>(missionData)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const response = await updateVisionMision(id, vision, mission, accessToken)
      const resJson = await response.json()
      if (!response.ok) {
        throw new Error(resJson.message)
      }

      customRevalidation('/admin/main-web/vision-mission')
      toast.success('Data berhasil disimpan')
    } catch (error: any) {
      toast.error('Gagal menyimpan data')
    } finally {
      setLoading(false)
    }
  }

  console.log(mission)

  return (
    <div className="mx-5 mt-5 mb-10 rounded-lg lg:px-10">
      <div className="grid lg:grid-cols-2 gap-x-10 gap-y-8">
        <div className="p-5 bg-white rounded-lg lg:p-8">
          <label htmlFor="about" className="inline-block mb-2 text-lg font-semibold text-dark-blue">
            Visi Sekolah
          </label>
          <textarea
            placeholder="Visi Sekolah"
            value={vision}
            onChange={(e) => setVision(e.target.value)}
            rows={8}
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
          />
        </div>
        <div className="p-5 bg-white rounded-lg lg:p-8">
          <label htmlFor="about" className="inline-block mb-2 text-lg font-semibold text-dark-blue">
            Misi Sekolah
          </label>
          <textarea
            placeholder="Visi Sekolah"
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            rows={8}
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EB5437]"
          />
        </div>
      </div>
      <div className="flex w-full">
        <button
          type="submit"
          className="mt-8 py-2 lg:py-2.5 px-8 lg:w-fit font-semibold rounded w-full bg-orange-05 text-white"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Simpan'}
        </button>
      </div>
    </div>
  )
}

export default Form
