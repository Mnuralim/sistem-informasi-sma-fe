import React from 'react'
import { SlLocationPin } from 'react-icons/sl'
import { MdOutlineMail } from 'react-icons/md'
import { IoPhonePortraitOutline } from 'react-icons/io5'

interface Props {
  address: string
  email: string
  mobile: string
  mapsLink: string
  village: string
  city: string
  province: string
  postCode: string
  subdistrict: string
}

const Contact = ({ address, email, mobile, mapsLink, city, postCode, province, subdistrict, village }: Props) => {
  return (
    <section id="contact" className="px-3 py-10 lg:py-16 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-orange-05 font-bold text-2xl lg:text-4xl mb-8 lg:mb-12 text-center">Hubungi Kami</h1>
        <div className="grid lg:grid-cols-5 gap-x-5 gap-y-8">
          <div className="lg:col-span-2 bg-white p-5 lg:p-10 flex flex-col gap-6 rounded-lg shadow-lg">
            <div className="flex gap-4 group">
              <div className="flex items-center justify-center bg-indigo-50 p-3 rounded-full aspect-square h-fit group-hover:bg-indigo-800 transform transition-all duration-300">
                <SlLocationPin
                  size={22}
                  className="group-hover:text-white text-indigo-600 transition-all duration-300"
                />
              </div>
              <div>
                <p className="text-black font-bold text-lg">Lokasi:</p>
                <p className="text-gray-700">
                  {address}, {village}, {subdistrict}, {city}, {province}, {postCode}
                </p>
              </div>
            </div>
            <div className="flex gap-4 group">
              <div className="flex items-center justify-center bg-indigo-50 p-3 rounded-full h-fit aspect-square group-hover:bg-indigo-800 transform transition-all duration-300">
                <MdOutlineMail
                  size={22}
                  className="group-hover:text-white text-indigo-600 transition-all duration-300"
                />
              </div>
              <div>
                <p className="text-black font-bold text-lg">Email:</p>
                <p className="text-gray-700">{email}</p>
              </div>
            </div>
            <div className="flex gap-4 group">
              <div className="flex items-center justify-center bg-indigo-50 p-3 rounded-full h-fit aspect-square group-hover:bg-indigo-800 transform transition-all duration-300">
                <IoPhonePortraitOutline
                  size={22}
                  className="group-hover:text-white text-indigo-600 transition-all duration-300"
                />
              </div>
              <div>
                <p className="text-black font-bold text-lg">Hubungi:</p>
                <p className="text-gray-700">{mobile}</p>
              </div>
            </div>
            <div>
              <iframe
                src={mapsLink}
                style={{ border: 0 }}
                className="w-full h-full aspect-[4/3] rounded-lg shadow-md"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white p-5 lg:p-10 rounded-lg shadow-lg">
            <form action="" className="w-full flex flex-col gap-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="text-black font-medium block mb-2">
                    Nama Anda
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full outline-none py-3 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:border-orange-05 focus:ring focus:ring-orange-300 transition"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-black font-medium block mb-2">
                    Email Anda
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full outline-none py-3 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:border-orange-05 focus:ring focus:ring-orange-300 transition"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="text-black font-medium block mb-2">
                  Subyek
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full outline-none py-3 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:border-orange-05 focus:ring focus:ring-orange-300 transition"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-black font-medium block mb-2">
                  Pesan
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full outline-none py-3 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:border-orange-05 focus:ring focus:ring-orange-300 transition"
                />
              </div>
              <div className="flex justify-center mt-6">
                <button className="font-semibold text-white bg-indigo-800 px-6 py-3 rounded-md shadow-md hover:bg-indigo-700 transition">
                  Kirim Pesan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
