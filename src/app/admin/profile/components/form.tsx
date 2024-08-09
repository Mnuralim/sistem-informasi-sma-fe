'use client'
import { updateProfile } from '@/lib/profile'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Props {
  profile: IProfile
  accessToken: string
}

const Form = ({ profile, accessToken }: Props) => {
  const [formData, setFormData] = useState<IProfile>(profile)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await updateProfile(formData, accessToken)

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Network response was not ok')
      }

      toast.success(data.message)
    } catch (error: any) {
      toast.error(error.message || 'Terjadi kesalahan yang tidak terduga')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form className="p-5 bg-white rounded-lg shadow-lg lg:px-10" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 font-semibold mb-2">
            Nama Sekolah
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg outline-none bg-gray-50 border-gray-300 focus:border-orange-05 focus:ring-2 focus:ring-orange-05"
            placeholder="Masukan nama sekolah"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">
            Email Sekolah
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg outline-none bg-gray-50 border-gray-300 focus:border-orange-05 focus:ring-2 focus:ring-orange-05"
            placeholder="Masukan email sekolah"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-gray-600 font-semibold mb-2">
            Nomor Telepon Sekolah
          </label>
          <input
            type="text"
            id="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg outline-none bg-gray-50 border-gray-300 focus:border-orange-05 focus:ring-2 focus:ring-orange-05"
            placeholder="Masukan nomor telepon sekolah"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tagline" className="block text-gray-600 font-semibold mb-2">
            Slogan
          </label>
          <input
            type="text"
            id="tagline"
            value={formData.tagline}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg outline-none bg-gray-50 border-gray-300 focus:border-orange-05 focus:ring-2 focus:ring-orange-05"
            placeholder="Masukan slogan"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="instagram" className="block text-gray-600 font-semibold mb-2">
            Instagram
          </label>
          <input
            type="text"
            id="instagram"
            value={formData.instagram}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg outline-none bg-gray-50 border-gray-300 focus:border-orange-05 focus:ring-2 focus:ring-orange-05"
            placeholder="Masukan link akun instagram sekolah"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="facebook" className="block text-gray-600 font-semibold mb-2">
            Facebook
          </label>
          <input
            type="text"
            id="facebook"
            value={formData.facebook}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg outline-none bg-gray-50 border-gray-300 focus:border-orange-05 focus:ring-2 focus:ring-orange-05"
            placeholder="Masukan link akun facebook sekolah"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="youtube" className="block text-gray-600 font-semibold mb-2">
            Youtube
          </label>
          <input
            type="text"
            id="youtube"
            value={formData.youtube}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg outline-none bg-gray-50 border-gray-300 focus:border-orange-05 focus:ring-2 focus:ring-orange-05"
            placeholder="Masukan link akun youtube sekolah"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="village" className="block text-gray-600 font-semibold mb-2">
            Desa / Kelurahan
          </label>
          <input
            type="text"
            id="village"
            value={formData.village}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg outline-none bg-gray-50 border-gray-300 focus:border-orange-05 focus:ring-2 focus:ring-orange-05"
            placeholder="Masukan desa/kelurahan sekolah"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subdistrict" className="block text-gray-600 font-semibold mb-2">
            Kecamatan
          </label>
          <input
            type="text"
            id="subdistrict"
            value={formData.subdistrict}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg outline-none bg-gray-50 border-gray-300 focus:border-orange-05 focus:ring-2 focus:ring-orange-05"
            placeholder="Masukan kecamatan sekolah"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-600 font-semibold mb-2">
            Kota / Kabupaten
          </label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg outline-none bg-gray-50 border-gray-300 focus:border-orange-05 focus:ring-2 focus:ring-orange-05"
            placeholder="Masukan kota atau kabupaten sekolah"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="province" className="block text-gray-600 font-semibold mb-2">
            Provinsi
          </label>
          <input
            type="text"
            id="province"
            value={formData.province}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg outline-none bg-gray-50 border-gray-300 focus:border-orange-05 focus:ring-2 focus:ring-orange-05"
            placeholder="Masukan provinsi sekolah"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="postCode" className="block text-gray-600 font-semibold mb-2">
            Kode Pos
          </label>
          <input
            type="text"
            id="postCode"
            value={formData.postCode}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg outline-none bg-gray-50 border-gray-300 focus:border-orange-05 focus:ring-2 focus:ring-orange-05"
            placeholder="Masukan kode pos"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mapsLink" className="block text-gray-600 font-semibold mb-2">
            Link Google Maps
          </label>
          <input
            type="text"
            id="mapsLink"
            value={formData.mapsLink}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg outline-none bg-gray-50 border-gray-300 focus:border-orange-05 focus:ring-2 focus:ring-orange-05"
            placeholder="Masukan link google maps"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-600 font-semibold mb-2">
            Alamat Lengkap
          </label>
          <textarea
            id="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg outline-none bg-gray-50 border-gray-300 focus:border-orange-05 focus:ring-2 focus:ring-orange-05"
            placeholder="Masukan nama jalan, dusun dll."
            rows={5}
          />
        </div>

        <button
          type="submit"
          className={`w-full mt-6 text-white rounded-lg h-12 bg-orange-05 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-05 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? <FaSpinner className="w-5 h-5 mx-auto animate-spin" /> : 'Simpan'}
        </button>
      </form>
    </>
  )
}

export default Form
