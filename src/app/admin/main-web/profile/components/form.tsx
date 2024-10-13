'use client'
import { customRevalidation } from '@/actions/custom-revalidation'
import { updateProfile } from '@/lib/profile'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'

interface Props {
  profile: IProfile
  accessToken: string
}

const Form = ({ profile, accessToken }: Props) => {
  const [name, setName] = useState<string>(profile.name)
  const [tagline, setTagline] = useState<string>(profile.tagline)
  const [address, setAddress] = useState<string>(profile.address.address)
  const [mobile, setMobile] = useState<string>(profile.mobile)
  const [email, setEmail] = useState<string>(profile.email)
  const [facebook, setFacebook] = useState<string>(profile.facebook)
  const [instagram, setInstagram] = useState<string>(profile.instagram)
  const [youtube, setYoutube] = useState<string>(profile.youtube)
  const [mapsLink, setMapsLink] = useState<string>(profile.address.mapsLink)
  const [postCode, setPostCode] = useState<string>(profile.address.postCode)
  const [province, setProvince] = useState<string>(profile.address.province)
  const [city, setCity] = useState<string>(profile.address.city)
  const [subdistrict, setSubdistrict] = useState<string>(profile.address.subdistrict)
  const [village, setVillage] = useState<string>(profile.address.village)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await updateProfile(
        {
          address: address,
          city: city,
          email: email,
          facebook: facebook,
          instagram: instagram,
          mapsLink: mapsLink,
          mobile: mobile,
          name: name,
          postCode: postCode,
          province: province,
          subdistrict: subdistrict,
          tagline: tagline,
          village: village,
          youtube: youtube,
        },
        accessToken
      )

      const data = await response.json()
      if (!response.ok) {
        throw new Error('Terjadi kesalahan yang tidak terduga')
      }

      customRevalidation('/admin/main-web/profile')

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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
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
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
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
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
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
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
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
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
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
            value={village}
            onChange={(e) => setVillage(e.target.value)}
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
            value={subdistrict}
            onChange={(e) => setSubdistrict(e.target.value)}
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
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
            value={province}
            onChange={(e) => setProvince(e.target.value)}
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
            value={postCode}
            onChange={(e) => setPostCode(e.target.value)}
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
            value={mapsLink}
            onChange={(e) => setMapsLink(e.target.value)}
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
